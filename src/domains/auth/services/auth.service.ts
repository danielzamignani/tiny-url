import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDTO } from '../dtos/signup.req.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '@domains/users/services/user.service';
import { SignUpResponseDTO } from '../dtos/signup.res.dto';
import { SignInDTO } from '../dtos/signin.req.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDTO } from '../dtos/signin.res.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

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

    async signIn({ email, password }: SignInDTO): Promise<SignInResponseDTO> {
        const user = await this.userService.getUserByEmail(email);

        const passwordMatch = await bcrypt.compare(password, user?.password);

        if (!user || !passwordMatch) {
            throw new UnauthorizedException('Email or password incorrect');
        }

        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }
}
