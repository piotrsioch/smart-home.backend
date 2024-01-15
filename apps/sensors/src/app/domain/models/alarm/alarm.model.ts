import { AlarmStateEnum } from '@smart-home.backend/libs/common';
import { BaseSensor } from '../base-sensor';

export type AlarmCreateInput = {
  sensorId: string;
  state: AlarmStateEnum;
};

export class Alarm extends BaseSensor {
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
