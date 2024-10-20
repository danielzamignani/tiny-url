import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDTO {
    @ApiProperty({
        description: 'JWT Token.',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMjllNjdjZC04N2M4LTQyMWMtYmExMi00Y2VhZGI0Y2ZiZjgiLCJlbWFpbCI6ImRhbmllbHphbWlnbmFuaUBnbWFpbC5jb20iLCJpYXQiOjE3MjkyNzg3MTMsImV4cCI6MTcyOTI5NjcxM30.1t9PzIS4W42c8HM67CnOijBJtaGBmUHxryEX-vfPLag',
        type: 'string',
        nullable: false,
        required: true,
    })
    token: string;
}
