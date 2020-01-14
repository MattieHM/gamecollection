import {
    BadRequestException,
    Body,
    ConflictException,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Query, UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import {ApiImplicitQuery, ApiUseTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {DatabaseException} from '../exceptions/database.exception';
import {NotFoundFieldsException, SearchParamsb, SearchParamsWithErrorb} from '../exceptions/search.params';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {UsersService} from './users.service';
import {Users} from './entity/users.entity';
import {CreateUsersDto} from './dto/create-users.dto';
import {UpdateUsersDto} from './dto/update-users.dto';
import {RemovalUsersDto} from './dto/removal-users.dto';
import {CreateUsersPipe} from '../pipes/create-users.pipe';
import {CreateUsersDtoValidationPipe} from '../pipes/create-users-dto-validation.pipe';

@ApiUseTags('users')
@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full userid/country/age/idbought separately' })
    @ApiImplicitQuery({ name: 'userid', required: false })
    @ApiImplicitQuery({ name: 'country', required: false })
    @ApiImplicitQuery({ name: 'age', required: false })

       get(@Query('query') query?: string,
           @Query('userid') userid?: number,
           @Query('country') country?: string,
           @Query('age') age?: number,

    ): Observable<Users[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.usersService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        } else if ( country || age ) {
            const searchParamsb: SearchParamsb = {
                country: country || null,
                age: age || null,

            };
            return this.usersService.search(searchParamsb)
                .pipe(
                    first(),
                    map((res: Users[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithErrorb = {message: 'No giveout found for given data', data: searchParamsb};
                        }
                        return res;
                    }),
                );
        }
        return this.usersService.getAll();
    }

    @Get(':userid')
    getById(@Param('userid') userid: number): Observable<Users> {
        return this.usersService.getById(userid).pipe(
            first(),
        );
    }

    @Post()
    @UsePipes(CreateUsersPipe, CreateUsersDtoValidationPipe)
    create(@Body() options: CreateUsersDto): Observable<Users> {
        return this.usersService.search(options)
            .pipe(
                map(res => {
                    /*if (res && res.length !== 0) {
                        throw new ConflictException('Userid already exists');
                    }*/
                    return res;
                }),
                flatMap(() => this.usersService.create(options)),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':userid')
    update(@Param('userid') userid: number, @Body() options: UpdateUsersDto): Observable<Users> {
        return this.usersService.update(userid, options)
            .pipe(
                first(),
                flatMap(res => this.usersService.getById(userid).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':userid')
    delete(@Param('userid') userid: number): Observable<RemovalUsersDto> {
        return this.usersService.getById(userid).pipe(
            first(),
            flatMap(() => this.usersService.deleteById(userid)),
            first(),
            map(res => res.raw.affectedRows),
            map(affectedRows => {
                return {
                    affectedRows,
                    ok: affectedRows && affectedRows > 0,
                };
            }),
            catchError(err => {
                throw new DatabaseException(err.message);
            }),
        );
    }
}
