import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { getUTCDate } from '../helpers/date.helper';
import { AccessLog } from '../types/url-access-log.type';

export const ExtractAccessLog = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AccessLog => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const urlId = request.params.urlId;
        const ipAddress = (request.headers['x-forwarded-for'] ||
            request.socket.remoteAddress) as string;
        const userAgent = request.headers['user-agent'];
        const accessedAt = getUTCDate();

        return {
            ipAddress,
            userAgent,
            accessedAt,
        };
    }
);
