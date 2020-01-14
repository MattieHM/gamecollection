import { ApiModelProperty } from '@nestjs/swagger';
import { Games } from '../entity/games.entity';

export class GameResult {
  @ApiModelProperty({
    required: true, nullable: false, type: Games, example: {
      gamename: 'Age of Empires ll',
      recommendedage: '12',
      gameid: '1',
      countrylist: 'Poland',
      gameprice: '59',
      releasedate: '2002-11-09',
    },
  })
  data: Games;
}
