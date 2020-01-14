import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {from, Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {Users} from './entity/users.entity';
import {CreateUsersDto} from './dto/create-users.dto';
import {UpdateUsersDto} from './dto/update-users.dto';
import {prepareSearchParams, removeEmptyFields} from '../utils/utils';
import {SearchParams} from '../exceptions/search.params';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
    }

    getAll(): Observable<Users[]> {
        return from(this.usersRepository.find());
    }

    create(options: CreateUsersDto): Observable<Users> {
        return from(this.usersRepository.save(options));
    }

    getById(userid: number): Observable<Users> {
        return from(this.usersRepository.findOneOrFail(userid))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(userid: number): Observable<DeleteResult> {
        return from(this.usersRepository.delete(userid));
    }

    update(userid: number, options: UpdateUsersDto): Observable<UpdateResult> {
        return from(this.usersRepository.update(userid, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Users[]> {
        return from(this.usersRepository.query(
            `SELECT * FROM users WHERE userid LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No userid found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(paramsb: CreateUsersDto): Observable<Users[]> {
        const rawParamsb: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(paramsb));
        // @ts-ignore
        return from(this.usersRepository.find(rawParamsb));
        /*return from(this.buyGameRepository.find());*/
           }
}
