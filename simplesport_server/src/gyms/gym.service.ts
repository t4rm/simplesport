import { Injectable, NotFoundException } from '@nestjs/common';
import { Gym } from './gym.types';
import * as data from '../data/gyms.json';
import { Observable, of, map, throwError } from 'rxjs';
import * as fs from 'fs';

@Injectable()
export class GymService {
    private _gyms: Gym[] = [];
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

    addGym = (newGym: Gym): Observable<Gym> => {
        const gymExists = this._gyms.some(gym => gym === newGym)
        if (gymExists) {
            throwError(() => new Error('Cette salle de sport existe déjà'))
            return of(null);
        }
        this._gyms.push(newGym);

        return of(newGym);
    }


    deleteGym(gym: Gym): Observable<Gym> {
        return new Observable<Gym>(observer => {
            const index = this._gyms.findIndex(g => g === gym);
            if (index === -1) {
                observer.error(new NotFoundException('Introuvable : salle de sport non trouvée ou déjà supprimée'));
            } else {
                this._gyms.splice(index, 1);
                const gymsJson = JSON.stringify(this._gyms);
                fs.writeFile('../data/gyms.json', gymsJson, err => {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(gym);
                        observer.complete();
                    }
                });
            }
        });
    }
}
