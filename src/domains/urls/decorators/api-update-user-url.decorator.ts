import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiBearerAuth,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ApiUnauthorizedDecorator } from '@shared/decorators/api-unauthorized.decorator';
import { UpdateUserUrlDTO } from '../dtos/update-user-url.req.dto';

export function ApiUpdateUserUrl() {
    return applyDecorators(
        ApiUnauthorizedDecorator(),
        ApiOperation({
            summary: 'Update user URL',
            description:
                'Updates the details of a user-generated short URL based on the provided ID.',
        }),
        ApiOkResponse({ type: UpdateUserUrlDTO }),
        ApiNotFoundResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 404 },
                    message: {
                        type: 'string',
                        example: 'Url not found.',
                    },
                    path: { type: 'string', example: 'v1/urls/{urlId}' },
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
                    path: { type: 'string', example: 'v1/urls/{urlId}' },
                    timestamp: {
                        type: 'string',
                        example: new Date().toISOString(),
                    },
                },
            },
        }),
        ApiBearerAuth()
    );
}
