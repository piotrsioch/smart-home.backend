import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('smoke-sensor')
export class SmokeSensorEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  value: number;

  @Column()
  sensorId: string;

  @Column()
  createdAt: Date;
}
