import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { NotificationEntity } from '../entities/notification.entity';
import { INotificationRepository } from '../../../../application/contracts/repositories';
import { Notification } from '../../../../domain';

@Injectable()
export class NotificationRepository
  extends GenericRepository<NotificationEntity>
  implements INotificationRepository
{
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
  ) {
    super(repository);
  }

  async findNotificationCreatedInGivenMinutes(
    sensorId: string,
    minutes: number,
  ): Promise<Notification | null> {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - minutes * 60 * 1000);

    const result = await this._repository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sensorId,
      createdAt: { $gte: fiveMinutesAgo, $lte: now },
    });

    return result as Notification | null;
  }
}
