import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse,
    ApiForbiddenResponse,
    ApiBearerAuth,
    ApiNoContentResponse,
} from '@nestjs/swagger';
import { ApiUnauthorizedDecorator } from '@shared/decorators/api-unauthorized.decorator';

export function ApiDeleteUserUrl() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Delete a user url',
            description:
                'Deletes a user-generated short URL based on the provided ID.',
        }),
        ApiNoContentResponse(),
        ApiNotFoundResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 404 },
                    message: {
                        type: 'string',
                        example: 'Url not found.',
                    },
                    path: { type: 'string', example: 'v1/urls/{urlId}/' },
                    timestamp: {
                        type: 'string',
                        example: new Date().toISOString(),
                    },
                },
            },
        }),
        ApiForbiddenResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 403 },
                    message: {
                        type: 'string',
                        example: 'This URL does not belong to your account.',
                    },
                    path: { type: 'string', example: 'v1/urls/{urlId}/' },
                    timestamp: {
                        type: 'string',
                        example: new Date().toISOString(),
                    },
                },
            },
        }),
        ApiUnauthorizedDecorator()
    );
}
