import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {Users} from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), LogModule],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  providers: [UsersService],
})
export class UsersModule {}
