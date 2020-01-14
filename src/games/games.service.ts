import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {from, Observable, of, zip} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {Games} from './entity/games.entity';
import { flatMap } from 'rxjs/operators';
import {CreateGamesDto} from './dto/create-games.dto';
import {UpdateGamesDto} from './dto/update-games.dto';
import {prepareSearchParams, removeEmptyFields} from '../utils/utils';
import {SearchParams} from '../exceptions/search.params';
import {GameResult} from './models/createResult.model';
@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Games) private readonly gamesRepository: Repository<Games>) {
    }

    getAll(): Observable<Games[]> {
        return from(this.gamesRepository.find());
    }

    create(options: CreateGamesDto): Observable<Games> {
        return from(this.gamesRepository.save(options));
    }
/*    create(options: CreateGamesDto): Observable<GameResult> {
        const searchParams: SearchParams = {
            gamename: options.gamename,
            recommendedage: options.recommendedage,
            countrylist: options.countrylist,
            gameprice: options.gameprice,
            releasedate: options.releasedate,
        };
        return from(this.search(searchParams))
            .pipe(
                flatMap((res: Games[]) => {
                    if (res && res.length > 0) {
                        return zip(of(res[0]), of(true));
                    }
                    return zip(from(this.gamesRepository.save(options)), of(false));
                }),
                map(([games, wasFound]) => {
                    return { data: games, wasFound };
                }),
            );
    }*/

    getById(gameid: number): Observable<Games> {
        return from(this.gamesRepository.findOneOrFail(gameid))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(gameid: number): Observable<DeleteResult> {
        return from(this.gamesRepository.delete(gameid));
    }

    update(gameid: number, options: UpdateGamesDto): Observable<UpdateResult> {
        return from(this.gamesRepository.update(gameid, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Games[]> {
        return from(this.gamesRepository.query(
            `SELECT * FROM games WHERE gameid LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No gameid found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(params: CreateGamesDto): Observable<Games[]> {
        const rawParams: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(params));
        return from(this.gamesRepository.find(rawParams));
        /*return from(this.gamesRepository.find());*/
    }
}
