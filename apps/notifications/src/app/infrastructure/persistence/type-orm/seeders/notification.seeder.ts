import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationFactory } from '../factories/notification.factory';

@Injectable()
export class NotificationSeeder {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    private readonly notificationFactory: NotificationFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.notificationFactory.create();

      await this.notificationRepository.save(sensor);
    }

    console.log('Seeding for notification ended.');
  }
}
