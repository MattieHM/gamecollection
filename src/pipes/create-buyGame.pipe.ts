import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CreateBuyGameDto} from '../buyGame/dto/create-buyGame.dto';

@Injectable()
export class CreateBuyGamePipe implements PipeTransform {
    transform(opts: CreateBuyGameDto, metadata: ArgumentMetadata): CreateBuyGameDto {
        return Object.assign(opts, {
          /*  idbought: opts.idbought,*/
        });
    }
}
