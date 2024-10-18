import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SingUpDTO } from '../dtos/singup.req.dto';
import { AuthService } from '../services/auth.service';
import { SignUpResponseDTO } from '../dtos/singup.res.dto';
import { ApiUserSignup } from '../decorators/api-user-signup.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiUserSignup()
    @Post('signup')
    async createUser(@Body() singUpDTO: SingUpDTO): Promise<SignUpResponseDTO> {
        return this.authService.signUp(singUpDTO);
    }
}
