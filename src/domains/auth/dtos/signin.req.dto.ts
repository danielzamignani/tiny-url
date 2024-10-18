import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDTO {
    @ApiProperty({
        description: 'User email',
        example: 'danielzamignani@gmail.com',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '12345678',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    password: string;
}
