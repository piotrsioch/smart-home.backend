import { Module } from '@nestjs/common';
import { NotificationModule } from '../../application/notification';
import { SensorsController } from './controllers/sensors.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from './controllers/notification.controller';

const controllers = [SensorsController, NotificationController];

@Module({
  imports: [CqrsModule, NotificationModule],
  controllers,
})
export class RpcModule {}
