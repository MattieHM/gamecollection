import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateGamesDto} from '../games/dto/create-games.dto';

@Injectable()
export class CreateGamesDtoValidationPipe implements PipeTransform {
    transform(value: CreateGamesDto, metadata: ArgumentMetadata): CreateGamesDto {
        return value;
    }
}
