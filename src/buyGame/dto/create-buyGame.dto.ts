import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBuyGameDto {
   /* @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'idbought',
        nullable: true,
        pattern: 'Int',
        example: '1',
        required: false,
        type: 'string',
    })
    readonly idbought?: number;*/

    @IsString()
    @IsOptional()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'gameid',
        nullable: true,
        pattern: 'Int',
        example: '101',
        required: false,
        type: 'string',
    })
    readonly gameid?: number;

    @IsString()
    @IsOptional()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'gameid',
        nullable: true,
        pattern: 'Int',
        example: '1',
        required: false,
        type: 'string',
    })
    readonly userid?: number;
}
