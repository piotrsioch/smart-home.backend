import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorController } from './controllers/dht-sensor.controller';

const controllers = [DhtSensorController];

@Module({
  imports: [CqrsModule, DhtSensorModule],
  controllers,
})
export class RpcModule {}
