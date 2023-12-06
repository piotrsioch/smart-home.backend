import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { SensorTypeEnum } from '@smart-home.backend/libs/common';

@Entity('sensors')
export class SensorEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  type: SensorTypeEnum;

  @Column()
  name: string;

  @Column()
  location: string;
}
