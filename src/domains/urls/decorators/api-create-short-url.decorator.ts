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
            summary: 'Create a short url from the original url',
            description: 'Create a short url from the original url',
        }),
        ApiBody({ type: CreateShortUrlDTO }),
        ApiCreatedResponse({ type: CreateShortUrlResponseDTO }),
        ApiBearerAuth()
    );
}
