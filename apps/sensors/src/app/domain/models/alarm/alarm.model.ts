import { AlarmStateEnum, BaseModel } from '@smart-home.backend/libs/common';

export type AlarmCreateInput = {
  sensorId: string;
  state: AlarmStateEnum;
};

export class Alarm extends BaseModel {
  sensorId: string;
  state: AlarmStateEnum;

  static create(input: AlarmCreateInput): Alarm {
    const { sensorId, state } = input;

    const _this = new Alarm();

    _this.create();

    _this.sensorId = sensorId;
    _this.state = state;

    return _this;
  }
}
