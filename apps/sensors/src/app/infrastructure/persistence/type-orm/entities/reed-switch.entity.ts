import { Column, Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';

@Entity('reed-switch')
export class ReedSwitchEntity extends BaseSensorEntity {
  @Column()
  isOpened: boolean;
}
