import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  DeleteNotificationInputDto,
  GetNotificationByIdInputDto,
  mapObjectToDto,
  MarkNotificationAsReadInputDto,
  NotificationDto,
  NotificationListInputDto,
  NotificationsCommunicationEnum,
  PaginationOutput,
  ServiceEnum,
  SuccessDto,
  UnreadNotificationsDto,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@UseFilters(CustomExceptionFilter)
@Controller('/notifications')
export class NotificationController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: NotificationDto })
  @Get('/get-by-id')
  async getNotificationById(@Query() input: GetNotificationByIdInputDto): Promise<NotificationDto> {
    const result = await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.GET_NOTIFICATION_BY_ID,
      data: input,
    });

    return mapObjectToDto(NotificationDto, result);
  }

  @ApiOkResponsePaginated(NotificationDto)
  @Get('/list')
  async notificationList(
    @Query() input: NotificationListInputDto,
  ): Promise<PaginationOutput<NotificationDto>> {
    const result = await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.NOTIFICATION_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<NotificationDto>, result);
  }

  @ApiResponse({ status: 200, type: UnreadNotificationsDto })
  @Get('/get-unread-notifications')
  async getUnreadNotifications(): Promise<UnreadNotificationsDto> {
    const result = await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.GET_UNREAD_NOTIFICATIONS,
    });

    return mapObjectToDto(UnreadNotificationsDto, result);
  }

  @ApiResponse({ status: 200, type: NotificationDto })
  @Post('/mark-as-read')
  async markAsRead(@Body() input: MarkNotificationAsReadInputDto): Promise<NotificationDto> {
    const result = await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.MARK_NOTIFICATION_AS_READ,
      data: input,
    });

    return mapObjectToDto(NotificationDto, result);
  }

  @ApiResponse({ status: 200, type: SuccessDto })
  @Post('/delete')
  async delete(@Body() input: DeleteNotificationInputDto): Promise<SuccessDto> {
    const result = await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: NotificationsCommunicationEnum.DELETE_NOTIFICATION,
      data: input,
    });

    return mapObjectToDto(SuccessDto, result);
  }
}
