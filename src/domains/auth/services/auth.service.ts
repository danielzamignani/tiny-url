import { Injectable } from '@nestjs/common';
import { SignUpDTO } from '../dtos/signup.req.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../domains/users/services/user.service';
import { SignUpResponseDTO } from '../dtos/signup.res.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signUp(signUpDTO: SignUpDTO): Promise<SignUpResponseDTO> {
        const passwordHash = await bcrypt.hash(signUpDTO.password, 10);

        await this.userService.createUser({
            ...signUpDTO,
            password: passwordHash,
        });

        return {
            message: 'User created successfully',
        };
    }
}
