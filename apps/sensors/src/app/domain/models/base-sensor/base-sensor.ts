import { BaseModel } from '@smart-home.backend/libs/common';

export type BaseSensorCreateInput = {
  sensorId: string;
};

export class BaseSensor extends BaseModel {
  sensorId: string;

  static create(input: BaseSensorCreateInput): BaseSensor {
    const { sensorId } = input;

    const _this = new BaseSensor();
    _this.create();

    _this.sensorId = sensorId;

    return _this;
  }
}
