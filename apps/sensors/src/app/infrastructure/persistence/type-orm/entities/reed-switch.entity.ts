import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('reed-switch')
export class ReedSwitchEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  isOpened: boolean;

  @Column()
  sensorId: string;

  @Column()
  createdAt: Date;
}
