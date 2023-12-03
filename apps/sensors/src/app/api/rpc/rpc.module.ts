import { Module } from '@nestjs/common';
import { DhtSensorModule } from '../../application';

const controllers = [];

@Module({
  imports: [DhtSensorModule],
  controllers,
})
export class RpcModule {}
