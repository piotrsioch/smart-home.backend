import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('pir-sensor')
export class PirSensorEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  sensorId: string;

  @Column()
  createdAt: Date;
}
