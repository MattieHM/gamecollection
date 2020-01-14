import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CreateUsersDto} from '../users/dto/create-users.dto';

@Injectable()
export class CreateUsersPipe implements PipeTransform {
    transform(opts: CreateUsersDto, metadata: ArgumentMetadata): CreateUsersDto {
        return Object.assign(opts, {
           /* userid: opts.userid,*/
        });
    }
}
