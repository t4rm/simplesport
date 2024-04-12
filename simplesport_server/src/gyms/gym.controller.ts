import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
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

    /**
     * Prise en charge de l'ajout
     * @param newGym 
     * @returns 
     */
    @Post()
    addGym(@Body() newGym: Gym): Observable<Gym> {
        return this._gymService.addGym(newGym);
    }

    /**
     * Prise en charge de la suppression
     * @param gym 
     * @returns 
    */
    @Post('delete')
    deleteGym(@Body() newGym: Gym): Observable<Gym> {
        return this._gymService.deleteGym(newGym);
    }

}
