import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from '../dtos/signup.req.dto';
import { AuthService } from '../services/auth.service';
import { SignUpResponseDTO } from '../dtos/signup.res.dto';
import { ApiUserSignUp } from '../decorators/api-user-signup.decorator';
import { SignInDTO } from '../dtos/signin.req.dto';
import { SignInResponseDTO } from '../dtos/signin.res.dto';
import { ApiUserSignIn } from '../decorators/api-user-signin.decorator';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiUserSignUp()
    @Post('signup')
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpResponseDTO> {
        return await this.authService.signUp(signUpDTO);
    }

    @ApiUserSignIn()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDTO: SignInDTO): Promise<SignInResponseDTO> {
        return await this.authService.signIn(signInDTO);
    }
}
