import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { from, Observable, of, throwError } from 'rxjs';
import { filter, map, toArray, catchError } from 'rxjs/operators';
import * as data from '../data/exercises.json';
import { Exercise } from './exercise.types';
import { Difficulty, ExerciseConstants, ExerciseType, Muscle } from './exercise.constants';

@Injectable()
export class ExerciseService {
    private _exercises: Exercise[];
    /**
     * Constructeur de la classe ExerciseService
     */
    constructor() {
        this._exercises = data as Exercise[];
    }

    /**
     * Renvoie tous les exercices
     *
     * @returns {Observable<Exercise[] | void>}
     */
    findAll = (): Observable<Exercise[] | void> =>
        of(this._exercises).pipe(
            map((exercises: Exercise[]) =>
                !!exercises && !!exercises.length ? exercises : undefined,
            ),
        );
    ;

    validateParam = (param: string | undefined, allowedValues: readonly string[], paramName: string) => {
        if (param && !allowedValues.includes(param)) {
            throw new Error(`Paramètre ${paramName} invalide : ${param}`);
        }
    }

    findAllQuery = (difficulty?: Difficulty, muscle?: Muscle, type?: ExerciseType): Observable<Exercise[]> => {
        try {
            this.validateParam(muscle, ExerciseConstants.MUSCLES, 'muscle');
            this.validateParam(type, ExerciseConstants.TYPES, 'type');
            this.validateParam(difficulty, ExerciseConstants.DIFFICULTIES, 'difficulty');
            return from(this._exercises).pipe(
                filter((exo: Exercise) =>
                    (difficulty ? exo.difficulty === difficulty : true) &&
                    (muscle ? exo.muscle === muscle : true) &&
                    (type ? exo.type === type : true)
                ),
                toArray()
            );
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    };
}