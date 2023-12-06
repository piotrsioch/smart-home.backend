import { Module } from '@nestjs/common';
import { CustomClientModule } from '@smart-home.backend/libs/common';
import { DhtSensorController } from './dht-sensor';
import { SensorController } from './sensor';
import { PirSensorController } from './pir-sensor';
import { SmokeSensorController } from './smoke-sensor';
import { ReedSwitchController } from './reed-switch';

@Module({
  imports: [CustomClientModule],
  controllers: [
    DhtSensorController,
    SensorController,
    PirSensorController,
    SmokeSensorController,
    ReedSwitchController,
  ],
  exports: [],
})
export class EspSensorsModule {}
