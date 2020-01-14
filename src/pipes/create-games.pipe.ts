import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CreateGamesDto} from '../games/dto/create-games.dto';
import {toCanonical} from '../utils/utils';

@Injectable()
export class CreateGamesPipe implements PipeTransform {
    transform(opts: CreateGamesDto, metadata: ArgumentMetadata): CreateGamesDto {
        return Object.assign(opts, {
            /*gameid: opts.gameid,*/
            gamename : toCanonical(opts.gamename),
        });
    }
}
