import { Controller } from '@nestjs/common';
import { CustomClientProxy } from '@smart-home.backend/libs/common/src/infrastructure/communication';

@Controller('users/test')
export class UsersTestController {
  constructor(private client: CustomClientProxy) {}
}
