import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from '../entity/users.entity';

export class CreateUsersDto {
 /*   @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'Идентификатор пользователя',
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
        description: 'Страна пользователя',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: false,
        example: 'Russia',
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
        example: '16',
        required: false,
        type: 'string',
    })
    readonly age?: number;

}
