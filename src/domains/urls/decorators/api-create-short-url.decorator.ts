import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiBody,
    ApiCreatedResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateShortUrlDTO } from '../dtos/create-short-url.req.dto';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';

export function ApiCreateShortUrl() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Short URL',
            description:
                'Generates a shortened URL from the provided original URL. ',
        }),
        ApiBody({ type: CreateShortUrlDTO }),
        ApiCreatedResponse({ type: CreateShortUrlResponseDTO }),
        ApiBearerAuth()
    );
}
