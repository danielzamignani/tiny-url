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

jest.mock('nanoid', () => ({
    nanoid: jest.fn(),
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

const userId = '12345';

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
});
