import { applyDecorators } from '@nestjs/common';
import {
    ApiFoundResponse,
    ApiNotFoundResponse,
    ApiOperation,
} from '@nestjs/swagger';

export function ApiRedirect() {
    return applyDecorators(
        ApiOperation({
            summary: 'Redirect to original url',
            description: 'Redirect to original url',
        }),
        ApiFoundResponse(),
        ApiNotFoundResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 404 },
                    message: {
                        type: 'string',
                        example: 'Url not found',
                    },
                    error: { type: 'string', example: 'Not Found' },
                },
            },
        })
    );
}
