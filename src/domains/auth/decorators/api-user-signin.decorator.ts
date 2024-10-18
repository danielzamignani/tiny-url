import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiBody,
    ApiUnauthorizedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { SignInDTO } from '../dtos/signin.req.dto';
import { SignInResponseDTO } from '../dtos/signin.res.dto';

export function ApiUserSignIn() {
    return applyDecorators(
        ApiOperation({
            summary: 'Login user in app',
            description: 'Login user and return JWT token',
        }),
        ApiBody({ type: SignInDTO }),
        ApiOkResponse({ type: SignInResponseDTO }),
        ApiUnauthorizedResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 401 },
                    message: {
                        type: 'string',
                        example: 'Email or password incorrect',
                    },
                    error: { type: 'string', example: 'Unauthorized' },
                },
            },
        })
    );
}
