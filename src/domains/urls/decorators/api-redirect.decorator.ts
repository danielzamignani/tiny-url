import { applyDecorators } from '@nestjs/common';
import {
    ApiFoundResponse,
    ApiNotFoundResponse,
    ApiOperation,
} from '@nestjs/swagger';

export function ApiRedirect() {
    return applyDecorators(
        ApiOperation({
            summary: 'Redirect to original URL',
            description:
                'Redirects the request to the original URL based on the provided short URL.',
        }),
        ApiFoundResponse(),
        ApiNotFoundResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 404 },
                    message: {
                        type: 'string',
                        example: 'Url not found.',
                    },
                    path: { type: 'string', example: '/{shortUrlId}' },
                    timestamp: {
                        type: 'string',
                        example: new Date().toISOString(),
                    },
                },
            },
        })
    );
}
