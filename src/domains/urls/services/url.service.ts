import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Url } from '@database/entities/urls.entity';
import { Repository } from 'typeorm';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';
import { VwActiveUrl } from '@database/entities/vw-active-urls.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationRequestDTO } from '@shared/dtos/pagination.req.dto';
import { GetUserUrlsResponseDTO } from '../dtos/get-user-urls.res.dto';
import { getUTCDate } from '@shared/helpers/date.helper';
import { UpdateUserUrlResponseDTO } from '../dtos/update-user-url.res.dto';
import { UrlAccessLog } from '@database/entities/url-access-logs.entity';
import { AccessLog } from '@shared/types/url-access-log.type';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private readonly urlRepository: Repository<Url>,

        @InjectRepository(VwActiveUrl)
        private readonly vwActiveUrlRepository: Repository<VwActiveUrl>,

        @InjectRepository(UrlAccessLog)
        private readonly urlAccessLogRepository: Repository<UrlAccessLog>
    ) {}

    async createShortUrl(
        originalUrl: string,
        userId?: string
    ): Promise<CreateShortUrlResponseDTO> {
        const shortUrl = nanoid(6);

        const url = this.urlRepository.create({
            originalUrl: originalUrl,
            shortUrl: shortUrl,
            userId: userId ?? null,
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
        queryBuilder.where('userId = :userId', { userId });
        queryBuilder.orderBy('updatedAt', 'DESC');

        const paginationResult = await paginate<VwActiveUrl>(
            queryBuilder,
            paginationRequestDTO
        );

        paginationResult.items.forEach((item) => {
            item.shortUrl = `${process.env.BASE_URL}/${item.shortUrl}`;
        });

        return paginationResult;
    }

    async deleteUserUrl(urlId: string, userId: string): Promise<void> {
        await this.validateUrlOwnership(urlId, userId);

        const deleteDate = getUTCDate();
        await this.urlRepository.update(
            { id: urlId },
            {
                deletedAt: deleteDate,
                updatedAt: deleteDate,
            }
        );
    }

    async updateUserUrl(
        urlId: string,
        newUrl: string,
        userId: string
    ): Promise<UpdateUserUrlResponseDTO> {
        await this.validateUrlOwnership(urlId, userId);

        await this.urlRepository.update(
            { id: urlId },
            {
                originalUrl: newUrl,
                updatedAt: getUTCDate(),
            }
        );

        return {
            message: 'URL updated successfully',
        };
    }

    async getOriginalUrl(
        shortUrlId: string,
        accessLog: AccessLog
    ): Promise<string> {
        const url = await this.vwActiveUrlRepository.findOne({
            select: ['id', 'originalUrl'],
            where: { shortUrl: shortUrlId },
        });

        if (!url) throw new NotFoundException('Url not found');

        this.registerAccessLog(url.id, accessLog);

        return url.originalUrl;
    }

    private registerAccessLog(urlId: string, accessLog: AccessLog): void {
        const urlAccessLog = this.urlAccessLogRepository.create({
            urlId,
            ...accessLog,
        });

        this.urlAccessLogRepository.insert(urlAccessLog);
    }

    private async validateUrlOwnership(
        urlId: string,
        userId: string
    ): Promise<void> {
        const url = await this.vwActiveUrlRepository.findOneBy({
            id: urlId,
        });

        if (!url) throw new NotFoundException('Url not found');

        if (url.userId !== userId) {
            throw new ForbiddenException(
                'This URL does not belong to your account'
            );
        }
    }
}
