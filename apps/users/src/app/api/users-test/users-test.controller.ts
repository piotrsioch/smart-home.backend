import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { UserCommunicationEnum } from '@tasty.backend/libs/common/src/domain';

Controller();
export class UsersTestController {
  @MessagePattern(UserCommunicationEnum.TEST)
  test(): string {
    return 'Communication works';
  }
}
