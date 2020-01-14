import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Connection } from 'typeorm';
import { typeOrmOptions } from '../config/typeorm.config';
import {LogModule} from './logger/log.module';
import {LoggingInterceptor} from './interceptors/logging.interceptor';
import {UsersModule} from './users/users.module';
import {BuyGameModule} from './buyGame/buyGame.module';
import {GamesModule} from './games/games.module';

@Module({
  imports: [UsersModule,
    GamesModule,
    BuyGameModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    LogModule],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
