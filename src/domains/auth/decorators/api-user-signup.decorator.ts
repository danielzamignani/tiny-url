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
            summary: 'Create a user',
            description: 'Create a new user',
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
                        example: 'User already exists!',
                    },
                    error: { type: 'string', example: 'Unprocessable Entity' },
                },
            },
        })
    );
}
