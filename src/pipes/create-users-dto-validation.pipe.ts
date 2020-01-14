import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateUsersDto} from '../users/dto/create-users.dto';

@Injectable()
export class CreateUsersDtoValidationPipe implements PipeTransform {
    transform(value: CreateUsersDto, metadata: ArgumentMetadata): CreateUsersDto {
        return value;
    }
}
