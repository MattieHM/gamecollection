import {
    BadRequestException,
    Body,
    ConflictException,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Query, UseInterceptors,
    HttpCode,
    UsePipes,
} from '@nestjs/common';
import {ApiImplicitQuery, ApiUseTags, ApiResponse} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {DatabaseException} from '../exceptions/database.exception';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {GamesService} from './games.service';
import {Games} from './entity/games.entity';
import {CreateGamesPipe} from '../pipes/create-games.pipe';
import {CreateGamesDtoValidationPipe} from '../pipes/create-games-dto-validation.pipe';
import {CreateGamesDto} from './dto/create-games.dto';
import {UpdateGamesDto} from './dto/update-games.dto';
import {RemovalGamesDto} from './dto/removal-games.dto';
import { GameResult } from './models/createResult.model';
import {NotFoundFieldsException, SearchParams, SearchParamsWithError} from '../exceptions/search.params';

@ApiUseTags('games')
@UseInterceptors(LoggingInterceptor)
@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full gameid/recommendedage/countrylist/gamename/gameprice/releasedate separately' })
    @ApiImplicitQuery({ name: 'recommendedage', required: false })
    @ApiImplicitQuery({ name: 'countrylist', required: false })
    @ApiImplicitQuery({ name: 'gamename', required: false })
    @ApiImplicitQuery({ name: 'gameprice', required: false })
    @ApiImplicitQuery({ name: 'releasedate', required: false })
    get(@Query('query') query?: string,
        @Query('recommendedage') recommendedage?: number,
        @Query('countrylist') countrylist?: string,
        @Query('gamename') gamename?: string,
        @Query('gameprice') gameprice?: number,
        @Query('releasedate') releasedate?: Date,
    ): Observable<Games[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.gamesService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        } else if ( recommendedage || countrylist || gamename || gameprice || releasedate) {
            const searchParams: SearchParams = {
                recommendedage: recommendedage || null,
                countrylist: countrylist || null,
                gamename: gamename || null,
                gameprice: gameprice || null,
                releasedate: releasedate || null,
            };
            return this.gamesService.search(searchParams)
                .pipe(
                    first(),
                    map((res: Games[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithError = {message: 'No giveout found for given data', data: searchParams};
                            throw new NotFoundFieldsException(paramsWithError);
                        }
                        return res;
                    }),
                );
        }
        return this.gamesService.getAll();
    }

    @Get(':gameid')
    getById(@Param('gameid') gameid: number): Observable<Games> {
        return this.gamesService.getById(gameid).pipe(
            first(),
        );
    }

    @Post()
    @ApiResponse({ status: 200, type: Games })
    @HttpCode(200)
    @UsePipes(CreateGamesPipe, CreateGamesDtoValidationPipe)
    create(@Body() options: CreateGamesDto): Observable<Games> {
        return this.gamesService.create(options)
            .pipe(
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':gameid')
    update(@Param('gameid') gameid: number, @Body() options: UpdateGamesDto): Observable<Games> {
        return this.gamesService.update(gameid, options)
            .pipe(
                first(),
                flatMap(res => this.gamesService.getById(gameid).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':gameid')
    delete(@Param('gameid') gameid: number): Observable<RemovalGamesDto> {
        return this.gamesService.getById(gameid).pipe(
            first(),
            flatMap(() => this.gamesService.deleteById(gameid)),
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
