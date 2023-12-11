import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../../../application/notification/commands';

@Controller()
export class SensorsController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('notification-test')
  async test() {
    const command = new SendNotificationCommand({
      phoneNumber: process.env.USER_PHONE_NUMBER,
      message: 'test',
      sensorId: '555',
      name: '2323',
    });

    await this.commandBus.execute(command);
  }
}
