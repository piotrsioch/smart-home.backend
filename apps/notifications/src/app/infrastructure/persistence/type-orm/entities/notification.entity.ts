import { BaseMongoEntity } from '@smart-home.backend/libs/common';
import { Column, Entity } from 'typeorm';

@Entity('notification')
export class NotificationEntity extends BaseMongoEntity {
  @Column()
  name: string;

  @Column()
  message: string;

  @Column()
  receiver: string;

  @Column()
  sensorId: string;
}
