import { Module } from '@nestjs/common';
import { Url } from 'src/database/entities/urls.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './controllers/url.controller';
import { UrlService } from './services/url.service';
import { VwActiveUrl } from 'src/database/entities/vw-active-urls.entity';
import { RedirectController } from './controllers/redirect.controller';
import { UrlAccessLog } from 'src/database/entities/url-access-logs.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Url, VwActiveUrl, UrlAccessLog])],
    controllers: [UrlController, RedirectController],
    providers: [UrlService],
})
export class UrlModule {}
