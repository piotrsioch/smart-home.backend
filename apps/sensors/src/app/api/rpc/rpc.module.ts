import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorController } from './controllers/dht-sensor.controller';
import { SensorModule } from '../../application/sensors/sensor/sensor.module';
import { SensorController } from './controllers/sensor.controller';
import { PirSensorController } from './controllers/pir-sensor.controller';
import { PirSensorModule } from '../../application/sensors/pir-sensor/pir-sensor.module';
import { SmokeSensorController } from './controllers/smoke-sensor.controller';
import { SmokeSensorModule } from '../../application/sensors/smoke-sensor';
import { ReedSwitchController } from './controllers/reed-switch.controller';
import { ReedSwitchModule } from '../../application/sensors/reed-switch';
import { LightModule } from '../../application/sensors/light';
import { LightController } from './controllers/light.controller';
import { AlarmModule } from '../../application/sensors/alarm';
import { AlarmController } from './controllers/alarm.controller';

const controllers = [
  DhtSensorController,
  SensorController,
  PirSensorController,
  SmokeSensorController,
  ReedSwitchController,
  LightController,
  AlarmController,
];

@Module({
  imports: [
    CqrsModule,
    DhtSensorModule,
    SensorModule,
    PirSensorModule,
    SmokeSensorModule,
    ReedSwitchModule,
    LightModule,
    AlarmModule,
  ],
  controllers,
})
export class RpcModule {}
