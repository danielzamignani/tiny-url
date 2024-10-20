import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { extractTokenFromHeader } from '../helpers/auth.helper';

@Injectable()
export class SimpleJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException(
                'You must be logged in to access this resource.'
            );
        }

        try {
            await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Invalid or expired token.');
        }

        return true;
    }
}
