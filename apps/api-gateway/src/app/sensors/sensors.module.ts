import { Module } from '@nestjs/common';
import { CustomClientModule } from '@smart-home.backend/libs/common/src/infrastructure/communication';
import { SensorsTestController } from './sensors-test';

@Module({
  imports: [CustomClientModule],
  controllers: [SensorsTestController],
  providers: [],
})
export class SensorsModule {}
