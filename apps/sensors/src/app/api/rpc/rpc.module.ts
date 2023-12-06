import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorController } from './controllers/dht-sensor.controller';
import { SensorModule } from '../../application/sensor/sensor.module';
import { SensorController } from './controllers/sensor.controller';
import { PirSensorController } from './controllers/pir-sensor.controller';
import { PirSensorModule } from '../../application/pir-sensor/pir-sensor.module';

const controllers = [DhtSensorController, SensorController, PirSensorController];

@Module({
  imports: [CqrsModule, DhtSensorModule, SensorModule, PirSensorModule, SensorModule],
  controllers,
})
export class RpcModule {}
