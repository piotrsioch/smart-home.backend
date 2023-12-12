import { Column, Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';
import { AlarmStateEnum } from '@smart-home.backend/libs/common';

@Entity('alarm')
export class AlarmEntity extends BaseSensorEntity {
  @Column()
  state: AlarmStateEnum;
}
