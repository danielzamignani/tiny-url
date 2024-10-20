import { ApiProperty } from '@nestjs/swagger';
import { GenericMessage } from '@shared/dtos/generic-message.dto';

export class CreateShortUrlResponseDTO extends GenericMessage {
    @ApiProperty({
        description: 'Original url from request',
        example: 'https://www.google.com.br',
        type: 'string',
        nullable: false,
        required: true,
    })
    originalUrl: string;

    @ApiProperty({
        description: 'Short url',
        example: 'http://localhost/123456',
        type: 'string',
        nullable: false,
        required: true,
    })
    shortUrl: string;
}
