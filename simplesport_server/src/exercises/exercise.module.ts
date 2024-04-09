import { Module, Logger } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, Logger]
})
export class ExercisesModule { }
