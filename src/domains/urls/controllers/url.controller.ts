import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UrlService } from '../services/url.service';
import { CreateShortUrlDTO } from '../dtos/create-short-url.req.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { CreateShortUrlResponseDTO } from '../dtos/create-short-url.res.dto';
import { ApiCreateShortUrl } from '../decorators/api-create-short-url.decorator';
import { GetUserUrlsDTO } from '../dtos/get-user-urls.req.dto';
import { GetUserUrlsResponseDTO } from '../dtos/get-user-urls.res.dto';
import { SimpleJwtGuard } from 'src/shared/guards/simple-jwt.guard';
import { ApiGetUserUrls } from '../decorators/api-get-user-urls.decorator';
import { ApiDeleteUserUrl } from '../decorators/api-delete-user-url.decorator';
import { UpdateUserUrlDTO } from '../dtos/update-user-url.req.dto';
import { UpdateUserUrlResponseDTO } from '../dtos/update-user-url.res.dto';
import { ApiUpdateUserUrl } from '../decorators/api-update-user-url.decorator';

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

    @ApiGetUserUrls()
    @UseGuards(SimpleJwtGuard)
    @Get()
    async getUserUrls(
        @Query() getUserUrlsDTO: GetUserUrlsDTO,
        @CurrentUser() currentUser: ICurrentUser
    ): Promise<GetUserUrlsResponseDTO> {
        return await this.urlService.getUserUrls(
            currentUser.sub,
            getUserUrlsDTO
        );
    }

    @ApiDeleteUserUrl()
    @UseGuards(SimpleJwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':urlId')
    async deleteUserUrl(
        @Param('urlId', new ParseUUIDPipe()) urlId: string,
        @CurrentUser() currentUser: ICurrentUser
    ): Promise<void> {
        await this.urlService.deleteUserUrl(urlId, currentUser.sub);
    }

    @ApiUpdateUserUrl()
    @UseGuards(SimpleJwtGuard)
    @Patch(':urlId')
    async updateUserUrl(
        @Param('urlId', new ParseUUIDPipe()) urlId: string,
        @Body() { orinalUrl }: UpdateUserUrlDTO,
        @CurrentUser() currentUser: ICurrentUser
    ): Promise<UpdateUserUrlResponseDTO> {
        return await this.urlService.updateUserUrl(
            urlId,
            orinalUrl,
            currentUser.sub
        );
    }
}
