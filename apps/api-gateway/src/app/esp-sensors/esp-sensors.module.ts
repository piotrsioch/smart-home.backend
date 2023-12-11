import { Module } from '@nestjs/common';
import { CustomClientModule, CustomExceptionFilter } from '@smart-home.backend/libs/common';
import { DhtSensorController } from './dht-sensor';
import { SensorController } from './sensor';
import { PirSensorController } from './pir-sensor';
import { SmokeSensorController } from './smoke-sensor';
import { ReedSwitchController } from './reed-switch';
import { LightController } from './light';
import { AlarmController } from './alarm';

@Module({
  imports: [CustomClientModule],
  controllers: [
    DhtSensorController,
    SensorController,
    PirSensorController,
    SmokeSensorController,
    ReedSwitchController,
    LightController,
    AlarmController,
  ],
  providers: [CustomExceptionFilter],
  exports: [],
})
export class EspSensorsModule {}
