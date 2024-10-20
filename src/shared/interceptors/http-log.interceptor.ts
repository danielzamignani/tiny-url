import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpLogInterceptor implements NestInterceptor {
    private readonly logger;

    constructor() {
        this.logger = new Logger(HttpLogInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();

        this.logger.log(
            `Incoming Request: ${method} ${url} - ${new Date().toISOString()}`
        );

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now;
                this.logger.log(
                    `Outgoing Response: ${method} ${url} - ${responseTime}ms`
                );
            }),
            catchError((error) => {
                const responseTime = Date.now() - now;
                this.logger.error(
                    `Error Response: ${method} ${url} - ${responseTime}ms`
                );
                this.logger.error(`Error Details:`, error);

                return throwError(() => error);
            })
        );
    }
}
