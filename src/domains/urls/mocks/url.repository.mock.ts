import { Url } from 'src/database/entities/urls.entity';

export const urlMock: Omit<Url, 'generateId'> = {
    id: '5c93f941-8a75-4ab1-bbe7-15a21fa17df1',
    original_url: 'https://www.google.com.br',
    short_url: '9KE2cJ',
    created_at: '2024-10-19T21:34:38.525Z',
    updated_at: '2024-10-19T21:34:38.525Z',
    deleted_at: null,
    user_id: '029e67cd-87c8-421c-ba12-4ceadb4cfbf8',
};

export const urlRepositoryMock = {
    insert: jest.fn(),
    create: jest.fn().mockReturnValue(urlMock),
    update: jest.fn(),
};
