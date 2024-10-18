import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class BaseUserDTO {
    @ApiProperty({
        description: 'User name',
        example: 'Daniel Zamignnai',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'danielzamignani@gmail.com',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User accounts password',
        example: '12345678',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsString()
    password: string;
}
