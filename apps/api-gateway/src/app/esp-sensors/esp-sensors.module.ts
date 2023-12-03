import { Module } from '@nestjs/common';
import { CustomClientModule } from '@smart-home.backend/libs/common';
import { DhtSensorController } from './dht-sensor';

@Module({
  imports: [CustomClientModule],
  controllers: [DhtSensorController],
  exports: [],
})
export class EspSensorsModule {}
