import { SensorTypeEnum } from '@smart-home.backend/libs/common';

export type SensorCreateInput = {
  id: string;
  type: SensorTypeEnum;
  name: string;
  location: string;
};

export class Sensor {
  _id: string;
  type: SensorTypeEnum;
  name: string;
  location: string;
  roomId: string;

  static create(input: SensorCreateInput): Sensor {
    const { id, type, name, location } = input;

    const _this = new Sensor();

    _this._id = id;
    _this.type = type;
    _this.name = name;
    _this.location = location;
    _this.roomId = null;

    return _this;
  }
}
