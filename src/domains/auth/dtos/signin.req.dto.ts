import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
    @ApiProperty({
        description: 'User login email.',
        example: 'danielzamignani@gmail.com',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User login password.',
        example: '12345678',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
