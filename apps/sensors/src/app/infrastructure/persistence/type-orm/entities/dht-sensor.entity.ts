import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('dht-sensor')
export class DhtSensorEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  sensorId: string;

  @Column()
  temperature: string;

  @Column()
  humidity: string;
}
