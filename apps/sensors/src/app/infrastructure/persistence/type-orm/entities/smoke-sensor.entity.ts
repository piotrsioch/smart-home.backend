import { Column, Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';

@Entity('smoke-sensor')
export class SmokeSensorEntity extends BaseSensorEntity {
  @Column()
  value: number;
}
