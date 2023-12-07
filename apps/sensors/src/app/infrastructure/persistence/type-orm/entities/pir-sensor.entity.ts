import { Entity } from 'typeorm';
import { BaseSensorEntity } from './base-sensor.entity';

@Entity('pir-sensor')
export class PirSensorEntity extends BaseSensorEntity {}
