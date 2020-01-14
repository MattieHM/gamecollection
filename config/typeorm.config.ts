import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Log } from '../src/logger/log.entity';
import {Users} from '../src/users/entity/users.entity';
import {BuyGame} from '../src/buyGame/entity/buyGame.entity';
import {Games} from '../src/games/entity/games.entity';

export let typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'std-mysql',
  port: 3306,
  username: 'std_795',
  password: 'ZVIIk8tTXIJU',
  database: 'std_795',
  entities: [Users, BuyGame, Games, Log],
  synchronize: true,
};
