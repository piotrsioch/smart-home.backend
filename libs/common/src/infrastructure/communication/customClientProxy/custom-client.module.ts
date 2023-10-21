import { Module } from '@nestjs/common';
import { CustomClientProxy } from './custom-client-proxy';

@Module({
  providers: [CustomClientProxy],
  exports: [CustomClientProxy],
})
export class CustomClientModule {}
