import { ApiProperty } from '@nestjs/swagger';

export class GenericMessage {
    @ApiProperty({
        description: 'Generic success message',
        example: 'Operation carried out successfully',
        type: 'string',
        nullable: false,
        required: true,
    })
    message: string;
}
