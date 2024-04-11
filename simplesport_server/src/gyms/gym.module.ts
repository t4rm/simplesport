import { Module, Logger } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';

@Module({
  controllers: [GymController],
  providers: [GymService, Logger]
})
export class GymModule { }
