import { BaseSensor } from '../base-sensor';

export type SmokeSensorCreateInput = {
  sensorId: string;
  value: number;
};

export class SmokeSensor extends BaseSensor {
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
