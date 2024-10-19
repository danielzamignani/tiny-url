import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { extractTokenFromHeader } from '../helpers/auth.helper';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): Promise<ICurrentUser> => {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);

        if (token) {
            return jwtDecode(token);
        } else {
            return null;
        }
    }
);
