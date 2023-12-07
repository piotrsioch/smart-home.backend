import { Column } from 'typeorm';
import { BaseMongoEntity } from '@smart-home.backend/libs/common';

export class BaseSensorEntity extends BaseMongoEntity {
  @Column()
  sensorId: string;
}
