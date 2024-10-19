import { ApiProperty } from '@nestjs/swagger';
import { VwActiveUrl } from 'src/database/entities/vw-active-urls.entity';
import { PaginationResponseDTO } from 'src/shared/dtos/pagination.res.dto';

export class GetUserUrlsResponseDTO extends PaginationResponseDTO {
    @ApiProperty({
        description: 'Array of user urls',
        example: [
            {
                id: '5c93f941-8a75-4ab1-bbe7-15a21fa17df1',
                original_url: 'https://www.google.com.br',
                short_url: 'http://localhost:3000/9KE2cJ',
                created_at: '2024-10-19T21:34:38.525Z',
                updated_at: '2024-10-19T21:34:38.525Z',
            } as VwActiveUrl,
        ],
        nullable: false,
        required: true,
    })
    items: VwActiveUrl[];
}
