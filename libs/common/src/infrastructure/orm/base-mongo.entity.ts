import { Column, ObjectIdColumn } from 'typeorm';

export class BaseMongoEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: string;

  @Column()
  createdAt: Date;
}
