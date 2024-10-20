import { UrlAccessLog } from '@database/entities/url-access-logs.entity';

export type AccessLog = Pick<
    UrlAccessLog,
    'ipAddress' | 'userAgent' | 'accessedAt'
>;
