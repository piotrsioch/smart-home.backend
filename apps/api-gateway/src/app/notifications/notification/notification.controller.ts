import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  MarkNotificationAsReadInputDto,
  NotificationDto,
  NotificationListInputDto,
  NotificationsCommunicationEnum,
  PaginationOutput,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ChangeAlarmStateInputDto } from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@UseFilters(CustomExceptionFilter)
@Controller('/notifications')
export class NotificationController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: NotificationDto })
  @Get('/get-by-id')
  async getNotificationById(@Query() input: ChangeAlarmStateInputDto): Promise<NotificationDto> {
    return await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.GET_NOTIFICATION_BY_ID,
      data: input,
    });
  }

  @ApiOkResponsePaginated(NotificationDto)
  @Get('/list')
  async notificationList(
    @Query() input: NotificationListInputDto,
  ): Promise<PaginationOutput<NotificationDto>> {
    return await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.NOTIFICATION_LIST,
      data: input,
    });
  }

  @ApiResponse({ status: 200, type: NotificationDto })
  @Post('/mark-as-read')
  async markAsRead(@Body() input: MarkNotificationAsReadInputDto): Promise<NotificationDto> {
    return await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.MARK_NOTIFICATION_AS_READ,
      data: input,
    });
  }
}
