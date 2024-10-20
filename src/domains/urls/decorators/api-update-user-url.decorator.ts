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
            summary: 'Update user url',
            description: 'Update user url',
        }),
        ApiOkResponse({ type: UpdateUserUrlDTO }),
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
        ApiBearerAuth()
    );
}
