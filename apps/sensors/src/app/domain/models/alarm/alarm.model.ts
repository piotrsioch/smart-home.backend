import { BaseModel } from '@smart-home.backend/libs/common';

export type AlarmCreateInput = {
  sensorId: string;
  isActive: boolean;
};

export class Alarm extends BaseModel {
  sensorId: string;
  isActive: boolean;

  static create(input: AlarmCreateInput): Alarm {
    const { sensorId, isActive } = input;

    const _this = new Alarm();

    _this.create();

    _this.sensorId = sensorId;
    _this.isActive = isActive;

    return _this;
  }
}
