import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortUrlDTO {
    @ApiProperty({
        description: 'Url to be shortened',
        example: 'https://www.google.com.br',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsUrl()
    @IsNotEmpty()
    originalUrl: string;
}
