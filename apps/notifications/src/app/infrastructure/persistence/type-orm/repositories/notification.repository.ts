import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { NotificationEntity } from '../entities/notification.entity';
import { INotificationRepository } from '../../../../application/contracts/repositories';

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
}
