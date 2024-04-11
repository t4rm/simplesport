import {
    Controller,
    Get,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Gym } from './gym.types';
import { GymService } from './gym.service';
import { HttpInterceptor } from '../interceptors/http.interceptor.js';

@Controller('gyms')
@UseInterceptors(HttpInterceptor)
export class GymController {
    /**
 * Constructeur de la classe GymController
 * @param _gymService
 */
    constructor(private readonly _gymService: GymService) { }

    /**
     * Prise en charge de la route /gyms
     *
     * @returns Observable<Gym[] | void>
     */
    @Get()
    findAll(): Observable<Gym[] | void> {
        return this._gymService.findAll();
    }

}
