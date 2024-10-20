import { Url } from 'src/database/entities/urls.entity';

export const urlMock: Omit<Url, 'generateId'> = {
    id: '5c93f941-8a75-4ab1-bbe7-15a21fa17df1',
    originalUrl: 'https://www.google.com.br',
    shortUrl: '9KE2cJ',
    createdAt: '2024-10-19T21:34:38.525Z',
    updatedAt: '2024-10-19T21:34:38.525Z',
    deletedAt: null,
    userId: '029e67cd-87c8-421c-ba12-4ceadb4cfbf8',
};

export const queryBuilderMock = {
    where: jest.fn(),
    orderBy: jest.fn(),
};

export const urlRepositoryMock = {
    insert: jest.fn(),
    create: jest.fn().mockReturnValue(urlMock),
    update: jest.fn(),
};

export const urlAccessLogRepositoryMock = {
    insert: jest.fn(),
    create: jest.fn().mockReturnValue(urlMock),
};

export const vwActiveUrlRepositoryMock = {
    createQueryBuilder: jest.fn().mockImplementation(() => queryBuilderMock),
    findOneBy: jest.fn().mockResolvedValue(urlMock),
    findOne: jest.fn().mockResolvedValue(urlMock),
};
