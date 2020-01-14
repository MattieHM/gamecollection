import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {Games} from './entity/games.entity';
import {GamesController} from './games.controller';
import {GamesService} from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Games]), LogModule],
  controllers: [GamesController],
  exports: [TypeOrmModule],
  providers: [GamesService],
})
export class GamesModule {}
