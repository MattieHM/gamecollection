import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
export const MAX_NAME_LENGTH: number = 255;
export const MAX_AUTHOR_LENGTH: number = 255;

@Entity()
@Unique(['idbought'])
export class BuyGame {
  @PrimaryGeneratedColumn({ unsigned: true })
  idbought: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  @ApiModelProperty({ type: 'date', nullable: false, default: 'CURRENT_TIMESTAMP', required: false, example: '2019-11-08T14:49:20.000Z' })
  readonly databought: number;

  @Column({ type: 'int', default: null})
  gameid: number;

  @Column({ type: 'int', default: null})
  userid: number;
}
