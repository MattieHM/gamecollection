import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {from, Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {BuyGame} from './entity/buyGame.entity';
import {CreateBuyGameDto} from './dto/create-buyGame.dto';
import {UpdateBuyGameDto} from './dto/update-buyGame.dto';
import {SearchParams} from '../exceptions/search.params';
import {prepareSearchParams, removeEmptyFields} from '../utils/utils';
@Injectable()
export class BuyGameService {
    constructor(
        @InjectRepository(BuyGame) private readonly buyGameRepository: Repository<BuyGame>) {
    }

    getAll(): Observable<BuyGame[]> {
        return from(this.buyGameRepository.find());
    }

    create(options: CreateBuyGameDto): Observable<BuyGame> {
        return from(this.buyGameRepository.save(options));
    }

    getById(idbought: number): Observable<BuyGame> {
        return from(this.buyGameRepository.findOneOrFail(idbought))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(idbought: number): Observable<DeleteResult> {
        return from(this.buyGameRepository.delete(idbought));
    }

    update(idbought: number, options: UpdateBuyGameDto): Observable<UpdateResult> {
        return from(this.buyGameRepository.update(idbought, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<BuyGame[]> {
        return from(this.buyGameRepository.query(
            `SELECT * FROM buygame WHERE idbought LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No idbought found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(paramsa: CreateBuyGameDto): Observable<BuyGame[]> {
        const rawParamsa: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(paramsa));
        // @ts-ignore
        return from(this.buyGameRepository.find(rawParamsa));
        /*return from(this.buyGameRepository.find());*/
    }
}
