import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { ICurrentUser } from '../interfaces/current-user.interface';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): Promise<ICurrentUser> => {
        const request = context.switchToHttp().getRequest();
        const jwt = request.headers['authorization'];

        if (jwt) {
            return jwtDecode(jwt);
        } else {
            return null;
        }
    }
);
