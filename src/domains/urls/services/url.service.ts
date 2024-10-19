import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Url } from '../../../database/entities/urls.entity';
import { Repository } from 'typeorm';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private readonly urlRepository: Repository<Url>
    ) {}

    async createShortUrl(
        originalUrl: string,
        userId?: string
    ): Promise<CreateShortUrlResponseDTO> {
        const shortUrl = nanoid(6);

        const url = this.urlRepository.create({
            original_url: originalUrl,
            short_url: shortUrl,
            user_id: userId ?? null,
        });

        await this.urlRepository.insert(url);

        return {
            message: 'URL shortened successfully',
            shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
            originalUrl,
        };
    }
}
