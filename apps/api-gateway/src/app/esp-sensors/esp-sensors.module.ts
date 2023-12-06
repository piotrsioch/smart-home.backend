import { Module } from '@nestjs/common';
import { CustomClientModule } from '@smart-home.backend/libs/common';
import { DhtSensorController } from './dht-sensor';
import { SensorController } from './sensor';
import { PirSensorController } from './pir-sensor';
import { SmokeSensorController } from './smoke-sensor';

@Module({
  imports: [CustomClientModule],
  controllers: [DhtSensorController, SensorController, PirSensorController, SmokeSensorController],
  exports: [],
})
export class EspSensorsModule {}
