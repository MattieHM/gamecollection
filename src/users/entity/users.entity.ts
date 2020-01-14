import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export const MAX_COUNTRY_LENGTH: number = 255;

@Entity()
@Unique(['userid'])
export class Users {
  @PrimaryGeneratedColumn({ unsigned: true })
  userid: number;

  @Column({ type: 'varchar', length: MAX_COUNTRY_LENGTH , nullable: false })
  country: string;

     @Column({ type: 'int', default: null})
  age: number;

}
