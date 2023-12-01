import { Module } from '@nestjs/common';
import { UsersTestController } from './users-test/users-test.controller';
import { CustomClientModule } from '@smart-home.backend/libs/common/src/infrastructure/communication';

@Module({
  imports: [CustomClientModule],
  controllers: [UsersTestController],
  providers: [],
})
export class UsersModule {}
