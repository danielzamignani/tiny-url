import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

export class PaginationResponseDTO extends Pagination<any, IPaginationMeta> {
    @ApiProperty({
        description: 'Array of items',
        nullable: false,
        required: true,
    })
    items: any[];

    @ApiProperty({
        description: 'Metadata of pagination',
        example: {
            currentPage: 1,
            itemCount: 10,
            itemsPerPage: 10,
            totalItems: 10,
            totalPages: 1,
        },
        nullable: false,
        required: true,
    })
    meta: IPaginationMeta;
}
