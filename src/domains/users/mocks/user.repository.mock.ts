import { User } from '@database/entities/users.entity';

export const userMock: Omit<User, 'generateId'> = {
    id: '782195d9-a9e5-42ed-b43f-7393604a46de',
    name: 'Daniel Zamignnai',
    password: '$2b$10$HiKXhaWMGCWYpN9NReh6EOYnkiaxxdFUiJL4ZkX7RoIzjgLtR9/yK',
    email: 'danielzamignani@gmail.com',
    createdAt: '2024-10-18T15:27:08.714Z',
};

export const userRepositoryMock = {
    count: jest.fn().mockResolvedValue(0),
    insert: jest.fn(),
    findOneBy: jest.fn().mockResolvedValue(userMock),
    create: jest.fn().mockReturnValue(userMock),
};
