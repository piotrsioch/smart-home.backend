import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class DhtSensorEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  temperature: string;

  @Column()
  humidity: string;
}
