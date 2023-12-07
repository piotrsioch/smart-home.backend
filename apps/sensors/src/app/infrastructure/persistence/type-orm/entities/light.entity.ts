import { Column, Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';

@Entity('light')
export class LightEntity extends BaseSensorEntity {
  @Column()
  isOn: boolean;
}
