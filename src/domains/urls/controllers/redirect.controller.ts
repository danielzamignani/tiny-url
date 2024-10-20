import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { ExtractAccessLog } from '@shared/decorators/log-info.decorator';
import { AccessLog } from '@shared/types/url-access-log.type';
import { Response } from 'express';
import { ApiRedirect } from '../decorators/api-redirect.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Redirect')
@Controller()
export class RedirectController {
    constructor(private readonly urlService: UrlService) {}

    @ApiRedirect()
    @Get(':shortUrlId')
    async redirectToOriginalUrl(
        @Param('shortUrlId') shortUrlId: string,
        @ExtractAccessLog() accessLog: AccessLog,
        @Res() response: Response
    ): Promise<void> {
        const originalUrl = await this.urlService.getOriginalUrl(
            shortUrlId,
            accessLog
        );

        response.redirect(HttpStatus.FOUND, originalUrl);
    }
}
