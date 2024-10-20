import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserDTO {
    @ApiProperty({
        description: 'User name',
        example: 'Daniel Zamignnai',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'danielzamignani@gmail.com',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User accounts password',
        example: '12345678',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
