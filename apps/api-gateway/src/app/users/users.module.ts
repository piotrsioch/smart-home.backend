import { Module } from '@nestjs/common';
import { UsersTestController } from './users-test/users-test.controller';
import { clientProxyProvider } from './users-test/client-proxy.provider';

@Module({
  imports: [],
  controllers: [UsersTestController],
  providers: [clientProxyProvider],
})
export class UsersModule {}
