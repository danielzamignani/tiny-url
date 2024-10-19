import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UrlService } from '../services/url.service';
import { CreateShortUrlDTO } from '../dtos/create-short-url.req.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';
import { ApiCreateShortUrl } from '../decorators/api-create-short-url.decorator';

@ApiBearerAuth()
@ApiTags('Url')
@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) {}

    @ApiCreateShortUrl()
    @Post()
    async createShortUrl(
        @Body() { originalUrl }: CreateShortUrlDTO,
        @CurrentUser() currentUser: ICurrentUser
    ): Promise<CreateShortUrlResponseDTO> {
        return await this.urlService.createShortUrl(
            originalUrl,
            currentUser?.sub
        );
    }
}
