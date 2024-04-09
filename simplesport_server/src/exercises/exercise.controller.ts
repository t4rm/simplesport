import {
    Controller,
    Get,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.types';
import { ExerciseService } from './exercise.service';
import { HttpInterceptor } from '../interceptors/http.interceptor.js';
import { Difficulty, ExerciseType, Muscle } from './exercise.constants';

@Controller('exercises')
@UseInterceptors(HttpInterceptor)
export class ExerciseController {
    /**
 * Constructeur de la classe ExerciseController
 * @param _exerciseService
 */
    constructor(private readonly _exerciseService: ExerciseService) { }

    /**
     * Prise en charge de la route /exercises
     *
     * @returns Observable<Exercise[] | void>
     */
    @Get()
    findAll(): Observable<Exercise[] | void> {
        return this._exerciseService.findAll();
    }

    /**
     * Prise en charge de la route /exercises/query
     *
     * @param difficulty
     * @param muscle
     * @param type
     *
     * @returns Observable<Exercise[]>
     */

    @Get('query')
    findAllQuery(@Query('difficulty') difficulty: Difficulty, @Query('muscle') muscle: Muscle, @Query('type') type: ExerciseType) {
        return this._exerciseService.findAllQuery(difficulty, muscle, type);
    }

}
