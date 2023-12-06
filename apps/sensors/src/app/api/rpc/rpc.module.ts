import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorController } from './controllers/dht-sensor.controller';
import { SensorModule } from '../../application/sensor/sensor.module';

const controllers = [DhtSensorController];

@Module({
  imports: [CqrsModule, DhtSensorModule, SensorModule],
  controllers,
})
export class RpcModule {}
