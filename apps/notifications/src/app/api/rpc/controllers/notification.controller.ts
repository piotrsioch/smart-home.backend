import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateNotificationInputDto,
  DeleteNotificationInputDto,
  GetNotificationByIdInputDto,
  mapEntityToDto,
  MarkNotificationAsReadInputDto,
  NotificationDto,
  NotificationListInputDto,
  NotificationsCommunicationEnum,
  PaginationOutput,
  SuccessDto,
  UnreadNotificationsDto,
} from '@smart-home.backend/libs/common';
import {
  GetNotificationByIdQuery,
  NotificationListQuery,
} from '../../../application/notification/queries';
import {
  CreateNotificationCommand,
  DeleteNotificationCommand,
  MarkNotificationAsReadCommand,
} from '../../../application/notification/commands';
import { GetUnreadNotificationsQuery } from '../../../application/notification/queries/get-unread-notifications';

@Controller()
export class NotificationController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(NotificationsCommunicationEnum.MARK_NOTIFICATION_AS_READ)
  async markNotificationAsRead(
    @Payload() payload: MarkNotificationAsReadInputDto,
  ): Promise<NotificationDto> {
    const { id, state } = payload;

    const command = new MarkNotificationAsReadCommand({
      id,
      state,
    });

    const result = await this.commandBus.execute<MarkNotificationAsReadCommand>(command);

    return mapEntityToDto(NotificationDto, result);
  }

  @MessagePattern(NotificationsCommunicationEnum.CREATE_NOTIFICATION)
  async createNotification(
    @Payload() payload: CreateNotificationInputDto,
  ): Promise<NotificationDto> {
    const { phoneNumber, message, sensorId, name } = payload;

    const command = new CreateNotificationCommand({
      phoneNumber,
      message,
      sensorId,
      name,
    });

    const result = await this.commandBus.execute<CreateNotificationCommand>(command);

    return mapEntityToDto(NotificationDto, result);
  }

  @MessagePattern(NotificationsCommunicationEnum.DELETE_NOTIFICATION)
  async deleteNotification(@Payload() payload: DeleteNotificationInputDto): Promise<SuccessDto> {
    const { id } = payload;

    const command = new DeleteNotificationCommand({
      id,
    });

    return await this.commandBus.execute<DeleteNotificationCommand>(command);
  }

  @MessagePattern(NotificationsCommunicationEnum.GET_NOTIFICATION_BY_ID)
  async getNotificationById(
    @Payload() payload: GetNotificationByIdInputDto,
  ): Promise<NotificationDto> {
    const { id } = payload;

    const query = new GetNotificationByIdQuery({
      id,
    });

    const result = await this.queryBus.execute<GetNotificationByIdQuery>(query);

    return mapEntityToDto(NotificationDto, result);
  }

  @MessagePattern(NotificationsCommunicationEnum.GET_UNREAD_NOTIFICATIONS)
  async getUnreadNotifications(): Promise<UnreadNotificationsDto> {
    const query = new GetUnreadNotificationsQuery();

    const notifications = await this.queryBus.execute<GetUnreadNotificationsQuery>(query);

    const dto = new UnreadNotificationsDto();

    dto.notifications = notifications;

    return dto;
  }

  @MessagePattern(NotificationsCommunicationEnum.NOTIFICATION_LIST)
  async notificationList(
    @Payload() payload: NotificationListInputDto,
  ): Promise<PaginationOutput<NotificationDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new NotificationListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    const result = await this.queryBus.execute<NotificationListQuery>(query);

    return mapEntityToDto(PaginationOutput<NotificationDto>, result);
  }
}
