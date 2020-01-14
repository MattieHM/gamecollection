import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export const MAX_COUNTRYLIST_LENGTH: number = 255;
export const MAX_GAMENAME_LENGTH: number = 255;

@Entity()
@Unique(['gamename'])
export class Games {
    @PrimaryGeneratedColumn({ unsigned: true})
    @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, required: false, example: 1 })
    gameid: number;

    @Column({ type: 'int', default: null})
    @ApiModelProperty({ type: 'int', minimum: 0, nullable: true, required: true, example: 12 })
    recommendedage: number;

    @Column({ type: 'varchar', length: MAX_COUNTRYLIST_LENGTH , nullable: false })
    @ApiModelProperty({ type: 'string', nullable: false, required: true, example: 'Russia, Poland, France' })
    countrylist: string;

    @Column({ type: 'varchar', length: MAX_GAMENAME_LENGTH , nullable: false })
    @ApiModelProperty({ type: 'string', nullable: false, required: true, example: 'Heroes of Might and Magic 5' })
    gamename: string;

    @Column({ type: 'int', default: null})
    @ApiModelProperty({ type: 'int', minimum: 0, nullable: true, required: true, example: 59 })
    gameprice: number;

    @Column({ type: 'date', default: null })
    @ApiModelProperty({ type: 'date', nullable: true, default: null, required: true, example: '2001-09-11' })
    releasedate: Date;
}
