import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import {
  CustomClientProxy,
  CustomExceptionFilter,
  NotificationDto,
  NotificationListInputDto,
  NotificationsCommunicationEnum,
  PaginationOutput,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ChangeAlarmStateInputDto } from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';

@UseFilters(CustomExceptionFilter)
@Controller('/notifications')
export class NotificationController {
  constructor(private client: CustomClientProxy) {}

  @Get('/get-by-id')
  async getNotificationById(@Body() input: ChangeAlarmStateInputDto): Promise<NotificationDto> {
    return await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.GET_NOTIFICATION_BY_ID,
      data: input,
    });
  }

  @Get('/list')
  async notificationList(
    @Body() input: NotificationListInputDto,
  ): Promise<PaginationOutput<NotificationDto>> {
    return await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.NOTIFICATION_LIST,
      data: input,
    });
  }
}
