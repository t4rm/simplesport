import { Module } from '@nestjs/common';
import { ExercisesModule } from './exercises/exercise.module';
import { GymModule } from './gyms/gym.module';

@Module({
  imports: [ExercisesModule, GymModule],
})
export class AppModule { }