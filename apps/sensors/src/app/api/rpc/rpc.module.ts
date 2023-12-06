import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorController } from './controllers/dht-sensor.controller';
import { SensorModule } from '../../application/sensor/sensor.module';
import { SensorController } from './controllers/sensor.controller';
import { PirSensorController } from './controllers/pir-sensor.controller';
import { PirSensorModule } from '../../application/pir-sensor/pir-sensor.module';
import { SmokeSensorController } from './controllers/smoke-sensor.controller';
import { SmokeSensorModule } from '../../application/smoke-sensor';
import { ReedSwitchController } from './controllers/reed-switch.controller';
import { ReedSwitchModule } from '../../application/reed-switch';

const controllers = [
  DhtSensorController,
  SensorController,
  PirSensorController,
  SmokeSensorController,
  ReedSwitchController,
];

@Module({
  imports: [
    CqrsModule,
    DhtSensorModule,
    SensorModule,
    PirSensorModule,
    SmokeSensorModule,
    ReedSwitchModule,
  ],
  controllers,
})
export class RpcModule {}
