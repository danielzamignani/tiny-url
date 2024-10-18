import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../../domains/users/services/user.service';

import * as bcrypt from 'bcrypt';
import { SingUpDTO } from '../dtos/singup.req.dto';

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

    describe('singup', () => {
        const singUpDTO: SingUpDTO = {
            email: 'danielzamignani@gmail.com',
            name: 'Daniel Zamignani',
            password: '12345678',
        };

        it('should hash password before create user', async () => {
            await authService.signUp(singUpDTO);

            expect(bcrypt.hash).toHaveBeenCalledTimes(1);
            expect(bcrypt.hash).toHaveBeenCalledWith(singUpDTO.password, 10);
        });

        it('should call create user method', async () => {
            const passwordHash = 'hash';

            (bcrypt.hash as jest.Mock).mockResolvedValueOnce(passwordHash);

            await authService.signUp(singUpDTO);

            expect(userService.createUser).toHaveBeenCalledTimes(1);
            expect(userService.createUser).toHaveBeenCalledWith({
                ...singUpDTO,
                password: passwordHash,
            });
        });
    });
});
