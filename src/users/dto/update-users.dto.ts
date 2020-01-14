import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from '../entity/users.entity';

export class UpdateUsersDto {
  /*  @IsString()
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
    readonly userid?: number;*/

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_COUNTRY_LENGTH)
    @ApiModelProperty({
        description: 'User country',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: false,
        example: 'Poland',
        required: true,
    })
    readonly country: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'User age',
        nullable: true,
        pattern: 'Int',
        example: '30',
        required: false,
        type: 'string',
    })
    readonly age?: number;

}
