import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from '../dtos/signup.req.dto';
import { AuthService } from '../services/auth.service';
import { SignUpResponseDTO } from '../dtos/signup.res.dto';
import { ApiUserSignup } from '../decorators/api-user-signup.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiUserSignup()
    @Post('signup')
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpResponseDTO> {
        return this.authService.signUp(signUpDTO);
    }
}
