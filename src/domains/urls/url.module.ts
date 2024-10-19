import { Module } from '@nestjs/common';
import { Url } from 'src/database/entities/urls.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './controllers/url.controller';
import { UrlService } from './services/url.service';

@Module({
    imports: [TypeOrmModule.forFeature([Url])],
    controllers: [UrlController],
    providers: [UrlService],
})
export class UrlModule {}
