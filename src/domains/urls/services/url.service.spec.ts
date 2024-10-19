import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { nanoid } from 'nanoid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from '../../../database/entities/urls.entity';
import { Repository } from 'typeorm';
import { urlMock, urlRepositoryMock } from '../mocks/url.repository.mock';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';

jest.mock('nanoid', () => ({
    nanoid: jest.fn(),
}));

describe('UrlService Tests', () => {
    let urlService: UrlService;
    let urlRepository: Repository<Url>;

    beforeAll(async () => {
        const urlModule: TestingModule = await Test.createTestingModule({
            providers: [
                UrlService,
                {
                    provide: getRepositoryToken(Url),
                    useValue: urlRepositoryMock,
                },
            ],
        }).compile();
        urlService = urlModule.get<UrlService>(UrlService);
        urlRepository = urlModule.get<Repository<Url>>(getRepositoryToken(Url));
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
        const userId = '1234';

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
});
