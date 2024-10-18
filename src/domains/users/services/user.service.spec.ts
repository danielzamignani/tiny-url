import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../database/entities/users.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import {
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { userMock, userRepositoryMock } from '../mocks/user.repository.mock';

describe('UserService Tests', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const userModule: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
            ],
        }).compile();

        userService = userModule.get<UserService>(UserService);
        userRepository = userModule.get<Repository<User>>(
            getRepositoryToken(User)
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('createUser', () => {
        const createUserDTO: CreateUserDTO = {
            email: 'danielzamignani@gmail.com',
            name: 'Daniel Zamignani',
            password: '12345678',
        };

        it('should check if there is already a user with this email registered in database', async () => {
            await userService.createUser(createUserDTO);

            expect(userRepository.count).toHaveBeenCalledTimes(1);
            expect(userRepository.count).toHaveBeenCalledWith({
                where: { email: createUserDTO.email },
            });
        });

        it('should throw an error when trying to create a user with an existing email', async () => {
            (userRepository.count as jest.Mock).mockResolvedValueOnce(1);

            await expect(userService.createUser(createUserDTO)).rejects.toThrow(
                UnprocessableEntityException
            );
        });

        it('should create an instance of user entity', async () => {
            await userService.createUser(createUserDTO);

            expect(userRepository.create).toHaveBeenCalledTimes(1);
            expect(userRepository.create).toHaveBeenCalledWith(createUserDTO);
        });

        it('should insert the user in database', async () => {
            await userService.createUser(createUserDTO);

            expect(userRepository.insert).toHaveBeenCalledTimes(1);
            expect(userRepository.insert).toHaveBeenCalledWith(userMock);
        });
    });

    describe('getUserByEmail', () => {
        const email = 'danielzamignani@gmail.com';

        it('should search user in database by email', async () => {
            await userService.getUserByEmail(email);

            expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
            expect(userRepository.findOneBy).toHaveBeenCalledWith({
                email,
            });
        });

        it('should throw an error if user not exists', async () => {
            (userRepository.findOneBy as jest.Mock).mockResolvedValueOnce(null);

            await expect(userService.getUserByEmail(email)).rejects.toThrow(
                NotFoundException
            );
        });

        it('should return user', async () => {
            const user = await userService.getUserByEmail(email);

            expect(user).toEqual(userMock);
        });
    });
});
