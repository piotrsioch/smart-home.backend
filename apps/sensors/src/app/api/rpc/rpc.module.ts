import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorController } from './controllers/dht-sensor.controller';
import { SensorModule } from '../../application/sensor/sensor.module';
import { SensorController } from './controllers/sensor.controller';

const controllers = [DhtSensorController, SensorController];

@Module({
  imports: [CqrsModule, DhtSensorModule, SensorModule],
  controllers,
})
export class RpcModule {}
