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
            summary: 'Login User',
            description:
                'Authenticates a user and returns a JWT token for subsequent requests. ' +
                'Provide valid credentials (email and password) to log in successfully.',
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
                        example: 'Email or password incorrect.',
                    },
                    path: { type: 'string', example: 'v1/auth/signin' },
                    timestamp: {
                        type: 'string',
                        example: new Date().toISOString(),
                    },
                },
            },
        })
    );
}
