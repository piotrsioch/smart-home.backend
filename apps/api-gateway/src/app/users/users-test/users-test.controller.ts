import { Controller, Get } from '@nestjs/common';
import { ServiceEnum, UserCommunicationEnum } from '@smart-home.backend/libs/common/src/domain';
import { CustomClientProxy } from '@smart-home.backend/libs/common/src/infrastructure/communication';

@Controller('users/test')
export class UsersTestController {
  constructor(private client: CustomClientProxy) {}

  @Get()
  public async test() {
    return this.client.sendTo(ServiceEnum.USERS, {
      pattern: UserCommunicationEnum.TEST,
    });
  }
}
