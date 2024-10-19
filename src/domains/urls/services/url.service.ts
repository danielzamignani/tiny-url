import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Url } from '../../../database/entities/urls.entity';
import { Repository } from 'typeorm';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';
import { VwActiveUrl } from '../../../database/entities/vw-active-urls.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationRequestDTO } from '../../../shared/dtos/pagination.req.dto';
import { GetUserUrlsResponseDTO } from '../dtos/get-user-urls.res.dto';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private readonly urlRepository: Repository<Url>,

        @InjectRepository(VwActiveUrl)
        private readonly vwActiveUrlRepository: Repository<VwActiveUrl>
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

    async getUserUrls(
        userId: string,
        paginationRequestDTO: PaginationRequestDTO
    ): Promise<GetUserUrlsResponseDTO> {
        const queryBuilder = this.vwActiveUrlRepository.createQueryBuilder();
        queryBuilder.where('user_id = :userId', { userId });
        queryBuilder.orderBy('updated_at', 'DESC');

        const paginationResult = await paginate<VwActiveUrl>(
            queryBuilder,
            paginationRequestDTO
        );

        paginationResult.items.forEach((item) => {
            item.short_url = `${process.env.BASE_URL}/${item.short_url}`;
        });

        return paginationResult;
    }
}
