import { Column, Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';

@Entity('alarm')
export class AlarmEntity extends BaseSensorEntity {
  @Column()
  isActive: boolean;
}
