import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

Controller();
export class UsersTestController {
  @MessagePattern('test')
  test(): string {
    return 'Communication works';
  }
}
