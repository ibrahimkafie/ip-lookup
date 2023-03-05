import { ApiProperty } from '@nestjs/swagger';

export class LookupDto {
    @ApiProperty({
        description: 'List of IP addresses',
        required: true,
        example: ['99.251.17.130', '172.217.22.14'],
        type: [String]
    })
    ipAddresses!: string[];
}