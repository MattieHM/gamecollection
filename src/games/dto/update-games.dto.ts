import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRYLIST_LENGTH, MAX_GAMENAME_LENGTH} from '../entity/games.entity';

export class UpdateGamesDto {
 /*   @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'userid',
        nullable: true,
        pattern: 'Int',
        example: '1',
        required: false,
        type: 'string',
    })
    readonly gameid?: number;*/

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_COUNTRYLIST_LENGTH)
    @ApiModelProperty({
        description: 'User country',
        maxLength: MAX_COUNTRYLIST_LENGTH,
        nullable: false,
        example: 'Russia',
        required: true,
    })
    readonly countrylist: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_GAMENAME_LENGTH)
    @ApiModelProperty({
        description: 'Game name',
        maxLength: MAX_GAMENAME_LENGTH,
        nullable: false,
        example: 'Age of Empires ll',
        required: true,
    })
    readonly gamename: string;

    @IsString()
    @IsOptional()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'releasedate',
        nullable: true,
        pattern: 'yyyy-mm-dd',
        example: '1999-06-28',
        required: false,
        type: 'string',
    })
    readonly releasedate?: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'recommendedage',
        nullable: true,
        pattern: 'Int',
        example: '14',
        required: false,
        type: 'string',
    })
    readonly recommendedage?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'gameprice',
        nullable: true,
        pattern: 'Int',
        example: '69',
        required: false,
        type: 'string',
    })
    readonly gameprice?: number;
}
