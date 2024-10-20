import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { nanoid } from 'nanoid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from '../../../database/entities/urls.entity';
import { Repository } from 'typeorm';
import { urlMock, urlRepositoryMock } from '../mocks/url.repository.mock';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';
import { PaginationRequestDTO } from '../../../shared/dtos/pagination.req.dto';
import { VwActiveUrl } from '../../../database/entities/vw-active-urls.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { getUTCDate } from '../../../shared/helpers/date.helper';

jest.mock('nanoid', () => ({
    nanoid: jest.fn(),
}));

jest.mock('../../../shared/helpers/date.helper', () => ({
    getUTCDate: jest.fn(),
}));

jest.mock('nestjs-typeorm-paginate', () => ({
    paginate: jest.fn().mockResolvedValue({
        items: [
            {
                id: '5c93f941-8a75-4ab1-bbe7-15a21fa17df1',
                original_url: 'https://www.google.com.br',
                short_url: 'http://localhost:3000/9KE2cJ',
                created_at: '2024-10-19T21:34:38.525Z',
                updated_at: '2024-10-19T21:34:38.525Z',
            },
        ],
        meta: {
            currentPage: 1,
            itemCount: 10,
            itemsPerPage: 10,
            totalItems: 10,
            totalPages: 1,
        },
    }),
}));

const userId = urlMock.user_id;

const queryBuilderMock = {
    where: jest.fn(),
    orderBy: jest.fn(),
};

describe('UrlService Tests', () => {
    let urlService: UrlService;
    let urlRepository: Repository<Url>;
    let vwActiveUrlRepository: Repository<VwActiveUrl>;

    beforeAll(async () => {
        const urlModule: TestingModule = await Test.createTestingModule({
            providers: [
                UrlService,
                {
                    provide: getRepositoryToken(Url),
                    useValue: urlRepositoryMock,
                },
                {
                    provide: getRepositoryToken(VwActiveUrl),
                    useValue: {
                        createQueryBuilder: jest
                            .fn()
                            .mockImplementation(() => queryBuilderMock),
                        findOneBy: jest.fn().mockResolvedValue(urlMock),
                    },
                },
            ],
        }).compile();
        urlService = urlModule.get<UrlService>(UrlService);
        urlRepository = urlModule.get<Repository<Url>>(getRepositoryToken(Url));
        vwActiveUrlRepository = urlModule.get<Repository<VwActiveUrl>>(
            getRepositoryToken(VwActiveUrl)
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should be defined', () => {
        expect(urlService).toBeDefined();
    });

    describe('createShortUrl', () => {
        const url = 'https://www.google.com';
        const nanoIdMock = 'ABC123';
        const urlBase = 'https://localhost:3000';

        beforeAll(() => {
            (nanoid as jest.Mock).mockReturnValue(nanoIdMock);
        });

        it('should generate a short id for the new url', async () => {
            await urlService.createShortUrl(url);

            expect(nanoid).toHaveBeenCalledTimes(1);
            expect(nanoid).toHaveBeenCalledWith(6);
        });

        it('should create url entity for insert', async () => {
            await urlService.createShortUrl(url);

            expect(urlRepository.create).toHaveBeenCalledTimes(1);
            expect(urlRepository.create).toHaveBeenCalledWith({
                original_url: url,
                short_url: nanoIdMock,
                user_id: null,
            });
        });

        it('should register the user if he is logged in', async () => {
            await urlService.createShortUrl(url, userId);

            expect(urlRepository.create).toHaveBeenCalledTimes(1);
            expect(urlRepository.create).toHaveBeenCalledWith({
                original_url: url,
                short_url: nanoIdMock,
                user_id: userId,
            });
        });

        it('should insert the url entity', async () => {
            await urlService.createShortUrl(url, userId);

            expect(urlRepository.insert).toHaveBeenCalledTimes(1);
            expect(urlRepository.insert).toHaveBeenCalledWith(urlMock);
        });

        it('should return the new url', async () => {
            const res = await urlService.createShortUrl(url, userId);

            expect(res).toEqual({
                message: 'URL shortened successfully',
                originalUrl: url,
                shortUrl: `undefined/${nanoIdMock}`, //Testar com a env
            } as CreateShortUrlResponseDTO);
        });
    });

    describe('getUserUrls', () => {
        const paginationOptions: PaginationRequestDTO = {
            page: '1',
            limit: '10',
        };

        it('should create a querybuilder', async () => {
            await urlService.getUserUrls(userId, paginationOptions);

            expect(
                vwActiveUrlRepository.createQueryBuilder
            ).toHaveBeenCalledTimes(1);
        });

        it('should filter by the user id', async () => {
            await urlService.getUserUrls(userId, paginationOptions);

            expect(queryBuilderMock.where).toHaveBeenCalledTimes(1);
            expect(queryBuilderMock.where).toHaveBeenCalledWith(
                'user_id = :userId',
                { userId }
            );
        });

        it('should order by last update date', async () => {
            await urlService.getUserUrls(userId, paginationOptions);

            expect(queryBuilderMock.orderBy).toHaveBeenCalledTimes(1);
            expect(queryBuilderMock.orderBy).toHaveBeenCalledWith(
                'updated_at',
                'DESC'
            );
        });

        it('should call paginate method', async () => {
            await urlService.getUserUrls(userId, paginationOptions);

            expect(paginate).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteUserUrl', () => {
        const urlId = urlMock.id;

        it('should find the url by id', async () => {
            await urlService.deleteUserUrl(urlId, userId);

            expect(vwActiveUrlRepository.findOneBy).toHaveBeenCalledTimes(1);
            expect(vwActiveUrlRepository.findOneBy).toHaveBeenCalledWith({
                id: urlId,
            });
        });

        it('should throw error if not found url', async () => {
            (
                vwActiveUrlRepository.findOneBy as jest.Mock
            ).mockResolvedValueOnce(null);

            await expect(
                urlService.deleteUserUrl(urlId, userId)
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw error if user id dont match', async () => {
            await expect(
                urlService.deleteUserUrl(urlId, '123456')
            ).rejects.toThrow(ForbiddenException);
        });

        it('should call getUTCDate function', async () => {
            await urlService.deleteUserUrl(urlId, userId);

            expect(getUTCDate).toHaveBeenCalledTimes(1);
        });

        it('should register update in table with the date', async () => {
            const deleteDate = new Date();

            (getUTCDate as jest.Mock).mockReturnValueOnce(deleteDate);

            await urlService.deleteUserUrl(urlId, userId);

            expect(urlRepository.update).toHaveBeenCalledTimes(1);
            expect(urlRepository.update).toHaveBeenCalledWith(
                { id: urlId },
                {
                    deleted_at: deleteDate,
                    updated_at: deleteDate,
                }
            );
        });
    });

    describe('updateUserUrl', () => {
        const urlId = urlMock.id;
        const newUrl = 'https://www.google.com.br';

        it('should find the url by id', async () => {
            await urlService.updateUserUrl(urlId, newUrl, userId);

            expect(vwActiveUrlRepository.findOneBy).toHaveBeenCalledTimes(1);
            expect(vwActiveUrlRepository.findOneBy).toHaveBeenCalledWith({
                id: urlId,
            });
        });

        it('should throw error if not found url', async () => {
            (
                vwActiveUrlRepository.findOneBy as jest.Mock
            ).mockResolvedValueOnce(null);

            await expect(
                urlService.updateUserUrl(urlId, newUrl, userId)
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw error if user id dont match', async () => {
            await expect(
                urlService.updateUserUrl(urlId, newUrl, '123456')
            ).rejects.toThrow(ForbiddenException);
        });

        it('should register update in table', async () => {
            const updateDate = new Date();

            (getUTCDate as jest.Mock).mockReturnValueOnce(updateDate);

            await urlService.updateUserUrl(urlId, newUrl, userId);

            expect(urlRepository.update).toHaveBeenCalledTimes(1);
            expect(urlRepository.update).toHaveBeenCalledWith(
                { id: urlId },
                {
                    original_url: newUrl,
                    updated_at: updateDate,
                }
            );
        });
    });
});
