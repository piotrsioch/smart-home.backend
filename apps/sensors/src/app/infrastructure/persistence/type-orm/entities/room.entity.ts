import { Column, Entity } from 'typeorm';
import { BaseMongoEntity, RoomTypeEnum } from '@smart-home.backend/libs/common';

@Entity('room')
export class RoomEntity extends BaseMongoEntity {
  @Column()
  name: string;

  @Column({ enum: RoomTypeEnum })
  roomType: RoomTypeEnum;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, array: true })
  sensorsIds: string[];
}
