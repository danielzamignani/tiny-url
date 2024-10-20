import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateUserUrlDTO {
    @ApiProperty({
        description: 'New Url',
        example: 'https://www.google.com.br',
        type: 'string',
        nullable: false,
        required: false,
    })
    @IsUrl()
    @IsNotEmpty()
    orinalUrl: string;
}
