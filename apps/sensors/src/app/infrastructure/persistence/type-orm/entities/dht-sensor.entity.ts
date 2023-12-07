import { Column, Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';

@Entity('dht-sensor')
export class DhtSensorEntity extends BaseSensorEntity {
  @Column()
  temperature: string;

  @Column()
  humidity: string;
}
