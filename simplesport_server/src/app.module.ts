import { Module } from '@nestjs/common';
import { ExercisesModule } from './exercises/exercise.module';

@Module({
  imports: [ExercisesModule],
})
export class AppModule { }