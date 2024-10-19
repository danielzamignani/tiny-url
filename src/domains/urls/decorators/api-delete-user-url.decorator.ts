import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse,
    ApiForbiddenResponse,
    ApiBearerAuth,
    ApiNoContentResponse,
} from '@nestjs/swagger';
import { ApiUnauthorizedDecorator } from 'src/shared/decorators/api-unauthorized.decorator';

export function ApiDeleteUserUrl() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Delete a user url',
            description: 'Delete a user url based on id',
        }),
        ApiNoContentResponse(),
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
        }),
        ApiForbiddenResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 403 },
                    message: {
                        type: 'string',
                        example: 'This URL does not belong to your account',
                    },
                    error: { type: 'string', example: 'Forbidden' },
                },
            },
        }),
        ApiUnauthorizedDecorator()
    );
}
