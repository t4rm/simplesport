import { Injectable } from '@nestjs/common';
import { Gym } from './gym.types';
import * as data from '../data/gyms.json';
import { Observable, of, map } from 'rxjs';

@Injectable()
export class GymService {
    private _gyms: Gym[];
    /**
     * Constructeur de la classe GymService
     */
    constructor() {
        this._gyms = data as Gym[];
    }

    /**
     * Renvoie toutes les salles
     *
     * @returns {Observable<Gym[] | void>}
     */
    findAll = (): Observable<Gym[] | void> =>
        of(this._gyms).pipe(
            map((gyms: Gym[]) =>
                !!gyms && !!gyms.length ? gyms : undefined,
            ),
        );
    ;
}
