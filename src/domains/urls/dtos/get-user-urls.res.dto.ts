import { ApiProperty } from '@nestjs/swagger';
import { VwActiveUrl } from '@database/entities/vw-active-urls.entity';
import { PaginationResponseDTO } from '@shared/dtos/pagination.res.dto';

export class GetUserUrlsResponseDTO extends PaginationResponseDTO {
    @ApiProperty({
        description: 'Array of user urls',
        example: [
            {
                id: '5c93f941-8a75-4ab1-bbe7-15a21fa17df1',
                originalUrl: 'https://www.google.com.br',
                shortUrl: 'http://localhost:3000/9KE2cJ',
                createdAt: '2024-10-19T21:34:38.525Z',
                updatedAt: '2024-10-19T21:34:38.525Z',
                totalAccess: 10,
            } as VwActiveUrl,
        ],
        nullable: false,
        required: true,
    })
    items: VwActiveUrl[];
}
