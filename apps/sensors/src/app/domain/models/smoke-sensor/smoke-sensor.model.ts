import { BaseModel } from '@smart-home.backend/libs/common';

export type SmokeSensorCreateInput = {
  sensorId: string;
  value: number;
};

export class SmokeSensor extends BaseModel {
  sensorId: string;
  value: number;

  static create(input: SmokeSensorCreateInput): SmokeSensor {
    const { sensorId, value } = input;

    const _this = new SmokeSensor();

    _this.create();
    _this.sensorId = sensorId;
    _this.value = value;

    return _this;
  }
}
