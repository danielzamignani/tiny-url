import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiBody,
    ApiCreatedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { SignUpResponseDTO } from '../dtos/signup.res.dto';
import { SignUpDTO } from '../dtos/signup.req.dto';

export function ApiUserSignUp() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create a User',
            description:
                'Creates a new user in the system with the provided details.',
        }),
        ApiBody({ type: SignUpDTO }),
        ApiCreatedResponse({ type: SignUpResponseDTO }),
        ApiUnprocessableEntityResponse({
            schema: {
                type: 'object',
                properties: {
                    statusCode: { type: 'number', example: 422 },
                    message: {
                        type: 'string',
                        example: 'User already exists.',
                    },
                    path: { type: 'string', example: 'v1/auth/singup' },
                    timestamp: {
                        type: 'string',
                        example: new Date().toISOString(),
                    },
                },
            },
        })
    );
}
