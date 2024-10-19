import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetUserUrlsResponseDTO } from '../dtos/get-user-urls.res.dto';
import { ApiUnauthorizedDecorator } from '../../../shared/decorators/api-unauthorized.decorator';

export function ApiGetUserUrls() {
    return applyDecorators(
        ApiUnauthorizedDecorator(),
        ApiOperation({
            summary: 'Returns user urls',
            description: 'Returns an array of user urls',
        }),
        ApiOkResponse({ type: GetUserUrlsResponseDTO }),
        ApiBearerAuth()
    );
}
