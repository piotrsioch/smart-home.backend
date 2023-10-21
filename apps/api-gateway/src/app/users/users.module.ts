import { Module } from '@nestjs/common';
import { UsersTestController } from './users-test/users-test.controller';
import { CustomClientModule } from '@tasty.backend/libs/common/src/infrastructure/communication';

@Module({
  imports: [CustomClientModule],
  controllers: [UsersTestController],
  providers: [],
})
export class UsersModule {}
