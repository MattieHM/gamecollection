import { ApiModelProperty } from '@nestjs/swagger';
import {Users} from '../entity/users.entity';

export class GameResult {
  @ApiModelProperty({
    required: true, nullable: false, type: Users, example: {
      userid: '1',
      country: 'Poland',
      age: '16',
    },
  })
  data: Users;
}
