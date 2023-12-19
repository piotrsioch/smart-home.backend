import { BaseModel, RoomTypeEnum } from '@smart-home.backend/libs/common';

export type RoomCreateInput = {
  name: string;
  roomType: RoomTypeEnum;
  description?: string;
};

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
}
