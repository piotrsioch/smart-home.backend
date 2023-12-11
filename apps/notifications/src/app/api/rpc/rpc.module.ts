import { Module } from '@nestjs/common';
import { NotificationModule } from '../../application/notification';
import { SensorsController } from './controllers/sensors.controller';
import { CqrsModule } from '@nestjs/cqrs';

const controllers = [SensorsController];

@Module({
  imports: [CqrsModule, NotificationModule],
  controllers,
})
export class RpcModule {}
