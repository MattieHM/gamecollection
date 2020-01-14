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
import {ApiImplicitQuery, ApiUseTags, ApiResponse} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {DatabaseException} from '../exceptions/database.exception';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {BuyGameService} from './buyGame.service';
import {BuyGame} from './entity/buyGame.entity';
import {CreateBuyGameDtoValidationPipe} from '../pipes/create-buyGame-dto-validation.pipe';
import {CreateBuyGamePipe} from '../pipes/create-buyGame.pipe';
import {CreateBuyGameDto} from './dto/create-buyGame.dto';
import {UpdateBuyGameDto} from './dto/update-buyGame.dto';
import {RemovalBuyGameDto} from './dto/removal-buyGame.dto';
import {BuyGameResult} from './models/buyGameResult.model';
import {NotFoundFieldsException, SearchParamsa, SearchParamsWithErrora} from '../exceptions/search.params';
import {Games} from '../games/entity/games.entity';

@ApiUseTags('buyGame')
@UseInterceptors(LoggingInterceptor)
@Controller('buyGame')
export class BuyGameController {
    constructor(private readonly buyGameService: BuyGameService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full idbought/gameid/databought separately' })
    @ApiImplicitQuery({ name: 'idbought', required: false })
    @ApiImplicitQuery({ name: 'gameid', required: false })
    @ApiImplicitQuery({ name: 'userid', required: false })
       get(@Query('query') query?: string,
           @Query('idbought') idbought?: number,
           @Query('gameid') gameid?: number,
           @Query('userid') userid?: number,
          ): Observable<BuyGame[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.buyGameService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        } else if ( gameid || userid  ) {
            const searchParamsa: SearchParamsa = {
                gameid: gameid || null,
                userid: userid || null,

            };
            return this.buyGameService.search(searchParamsa)
                .pipe(
                    first(),
                    map((res: BuyGame[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithErrora = {message: 'No giveout found for given data', data: searchParamsa};
                        }
                        return res;
                    }),
                );
        }
        return this.buyGameService.getAll();
    }

    @Get(':idbought')
    getById(@Param('idbought') idbought: number): Observable<BuyGame> {
        return this.buyGameService.getById(idbought).pipe(
            first(),
        );
    }

    @Post()
    @ApiResponse({ status: 200, type: BuyGameResult })
    @UsePipes(CreateBuyGamePipe, CreateBuyGameDtoValidationPipe)
    create(@Body() options: CreateBuyGameDto): Observable<BuyGame> {
        return this.buyGameService.search(options)
            .pipe(
                map(res => {
                    /*if (res && res.length !== 0) {
                        throw new ConflictException('idbought already exists');
                    }*/
                    return res;
                }),
                flatMap(() => this.buyGameService.create(options)),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':idbought')
    update(@Param('idbought') idbought: number, @Body() options: UpdateBuyGameDto): Observable<BuyGame> {
        return this.buyGameService.update(idbought, options)
            .pipe(
                first(),
                flatMap(res => this.buyGameService.getById(idbought).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':idbought')
    delete(@Param('idbought') idbought: number): Observable<RemovalBuyGameDto> {
        return this.buyGameService.getById(idbought).pipe(
            first(),
            flatMap(() => this.buyGameService.deleteById(idbought)),
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
