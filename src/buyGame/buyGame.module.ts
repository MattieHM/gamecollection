import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {BuyGame} from './entity/buyGame.entity';
import {BuyGameController} from './buyGame.controller';
import {BuyGameService} from './buyGame.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuyGame]), LogModule],
  controllers: [BuyGameController],
  exports: [TypeOrmModule],
  providers: [BuyGameService],
})
export class BuyGameModule {}
