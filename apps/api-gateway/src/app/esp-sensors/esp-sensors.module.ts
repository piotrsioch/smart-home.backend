import { Module } from '@nestjs/common';
import { CustomClientModule } from '@smart-home.backend/libs/common';
import { DhtSensorController } from './dht-sensor';
import { SensorController } from './sensor';

@Module({
  imports: [CustomClientModule],
  controllers: [DhtSensorController, SensorController],
  exports: [],
})
export class EspSensorsModule {}
