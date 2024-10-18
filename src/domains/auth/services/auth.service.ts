import { Injectable } from '@nestjs/common';
import { SingUpDTO } from '../dtos/singup.req.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../domains/users/services/user.service';
import { SignUpResponseDTO } from '../dtos/singup.res.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signUp(singUpDTO: SingUpDTO): Promise<SignUpResponseDTO> {
        const passwordHash = await bcrypt.hash(singUpDTO.password, 10);

        await this.userService.createUser({
            ...singUpDTO,
            password: passwordHash,
        });

        return {
            message: 'User created successfully',
        };
    }
}
