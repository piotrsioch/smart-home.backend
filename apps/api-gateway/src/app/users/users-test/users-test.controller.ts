import { Controller, Get } from '@nestjs/common';
import { ServiceEnum, UserCommunicationEnum } from '@tasty.backend/libs/common/src/domain';
import { CustomClientProxy } from '@tasty.backend/libs/common/src/infrastructure/communication';

@Controller('users/test')
export class UsersTestController {
  constructor(private client: CustomClientProxy) {}

  @Get()
  public async test() {
    return this.client.sendTo(ServiceEnum.Users, {
      pattern: UserCommunicationEnum.TEST,
    });
  }
}
