import { BaseModel, SensorTypeEnum } from '@smart-home.backend/libs/common';

export type SensorCreateInput = {
  id: string;
  type: SensorTypeEnum;
  name: string;
  location: string;
};

export type SensorUpdateInput = Partial<Omit<SensorCreateInput, 'id'>>;

export class Sensor extends BaseModel {
  type: SensorTypeEnum;
  name: string;
  location: string;
  roomId: string;

  static create(input: SensorCreateInput): Sensor {
    const { id, type, name, location } = input;

    const _this = new Sensor();

    _this.create();

    _this._id = id;
    _this.type = type;
    _this.name = name;
    _this.location = location;
    _this.roomId = null;

    return _this;
  }

  update(input: SensorUpdateInput): void {
    const { type, name, location } = input;

    this.type = type ?? this.type;
    this.name = name ?? this.name;
    this.location = location ?? this.location;

    super.update();
  }
}
