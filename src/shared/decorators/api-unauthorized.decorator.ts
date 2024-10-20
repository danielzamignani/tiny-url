import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function ApiUnauthorizedDecorator() {
    return applyDecorators(
        ApiUnauthorizedResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 401 },
                    message: {
                        type: 'string',
                        example: [
                            'You must be logged in to access this resource.',
                            'Invalid or expired token.',
                        ],
                    },
                    error: { type: 'string', example: 'Unauthorized' },
                },
            },
        })
    );
}
