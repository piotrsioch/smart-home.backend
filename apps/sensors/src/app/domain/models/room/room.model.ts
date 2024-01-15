import { BaseModel, RoomTypeEnum } from '@smart-home.backend/libs/common';

export type RoomCreateInput = {
  name: string;
  roomType: RoomTypeEnum;
  description?: string;
};

export type RoomUpdateInput = Partial<RoomCreateInput>;

export class Room extends BaseModel {
  name: string;
  roomType: RoomTypeEnum;
  description?: string;
  sensorsIds: string[];

  static create(input: RoomCreateInput): Room {
    const { name, roomType, description } = input;

    const _this = new Room();

    _this.create();

    _this.name = name;
    _this.roomType = roomType;
    _this.description = description ?? 'null';
    _this.sensorsIds = [];

    return _this;
  }

  update(input: RoomUpdateInput): void {
    const { name, description, roomType } = input;

    this.name = name ?? this.name;
    this.description = description ?? this.description;
    this.roomType = roomType ?? this.roomType;

    super.update();
  }
}
