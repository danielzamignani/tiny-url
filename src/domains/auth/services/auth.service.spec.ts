import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../../domains/users/services/user.service';

import * as bcrypt from 'bcrypt';
import { SignUpDTO } from '../dtos/signup.req.dto';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('UserService Tests', () => {
    let authService: AuthService;
    let userService: UserService;

    beforeAll(async () => {
        const authModule: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        createUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = authModule.get<AuthService>(AuthService);
        userService = authModule.get<UserService>(UserService);
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
});
