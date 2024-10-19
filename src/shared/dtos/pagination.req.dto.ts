import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationRequestDTO implements IPaginationOptions {
    @ApiProperty({
        description: 'Items limit per page',
        example: '10',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsNumberString()
    @IsNumber()
    limit: string | number = '10';

    @ApiProperty({
        description: 'Page of pagination',
        example: '1',
        type: 'string',
        nullable: false,
        required: true,
    })
    @IsNumberString()
    @IsNumber()
    page: string | number = 1;
}
