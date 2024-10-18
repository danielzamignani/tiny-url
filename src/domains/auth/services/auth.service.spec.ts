import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../../domains/users/services/user.service';

import * as bcrypt from 'bcrypt';
import { SignUpDTO } from '../dtos/signup.req.dto';
import { userMock } from '../../../domains/users/mocks/user.repository.mock';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn().mockResolvedValue(true),
}));

describe('UserService Tests', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeAll(async () => {
        const authModule: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        createUser: jest.fn(),
                        getUserByEmail: jest.fn().mockResolvedValue(userMock),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = authModule.get<AuthService>(AuthService);
        userService = authModule.get<UserService>(UserService);
        jwtService = authModule.get<JwtService>(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('signUp', () => {
        const signUpDTO: SignUpDTO = {
            email: 'danielzamignani@gmail.com',
            name: 'Daniel Zamignani',
            password: '12345678',
        };

        it('should hash password before create user', async () => {
            await authService.signUp(signUpDTO);

            expect(bcrypt.hash).toHaveBeenCalledTimes(1);
            expect(bcrypt.hash).toHaveBeenCalledWith(signUpDTO.password, 10);
        });

        it('should call create user method', async () => {
            const passwordHash = 'hash';

            (bcrypt.hash as jest.Mock).mockResolvedValueOnce(passwordHash);

            await authService.signUp(signUpDTO);

            expect(userService.createUser).toHaveBeenCalledTimes(1);
            expect(userService.createUser).toHaveBeenCalledWith({
                ...signUpDTO,
                password: passwordHash,
            });
        });
    });

    describe('signIn', () => {
        const signInDTO = {
            email: 'danielzamignani@gmail.com',
            password: '12345678',
        };

        it('should find user by email', async () => {
            await authService.signIn(signInDTO);

            expect(userService.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(userService.getUserByEmail).toHaveBeenCalledWith(
                signInDTO.email
            );
        });

        it('should compare the passwords', async () => {
            await authService.signIn(signInDTO);

            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
            expect(bcrypt.compare).toHaveBeenCalledWith(
                signInDTO.password,
                userMock.password
            );
        });

        it('should throw error if user not found', async () => {
            (userService.getUserByEmail as jest.Mock).mockResolvedValueOnce(
                null
            );

            await expect(authService.signIn(signInDTO)).rejects.toThrow(
                UnauthorizedException
            );
        });

        it('should throw error if passwords dont match', async () => {
            (bcrypt.compare as jest.Mock).mockReturnValueOnce(false);

            await expect(authService.signIn(signInDTO)).rejects.toThrow(
                UnauthorizedException
            );
        });

        it('should generate jwt token', async () => {
            await authService.signIn(signInDTO);

            expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
            expect(jwtService.signAsync).toHaveBeenCalledWith({
                email: signInDTO.email,
                sub: userMock.id,
            });
        });
    });
});
