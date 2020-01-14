import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateBuyGameDto} from '../buyGame/dto/create-buyGame.dto';

@Injectable()
export class CreateBuyGameDtoValidationPipe implements PipeTransform {
    transform(value: CreateBuyGameDto, metadata: ArgumentMetadata): CreateBuyGameDto {
        return value;
    }
}
