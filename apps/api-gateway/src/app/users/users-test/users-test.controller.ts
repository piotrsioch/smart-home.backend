import { Controller, Get, Inject } from '@nestjs/common';
import { MicroservicesNamesEnum } from '@tasty.backend/libs/common/src/domain';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users/test')
export class UsersTestController {
  constructor(@Inject(MicroservicesNamesEnum.Users) private client: ClientProxy) {}

  @Get()
  public async test() {
    return this.client.send('test', 'test').toPromise();
  }
}
