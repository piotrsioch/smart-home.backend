import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class DhtSensorEntity {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  temperature: string;

  @Column()
  humidity: string;
}
