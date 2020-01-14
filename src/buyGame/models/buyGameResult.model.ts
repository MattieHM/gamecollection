import { ApiModelProperty } from '@nestjs/swagger';
import { BuyGame } from '../entity/buyGame.entity';

export class BuyGameResult {
  @ApiModelProperty({
    required: true, nullable: false, type: BuyGame, example: {
      idbought: '1',
      gameid: '1',
      userid: '1',
      databought: new Date(),
    },
  })
  data: BuyGame;

}
