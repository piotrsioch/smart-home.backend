import { BaseSensor } from '../base-sensor';

export type LightCreateInput = {
  sensorId: string;
  isOn: boolean;
};

export class Light extends BaseSensor {
  sensorId: string;
  isOn: boolean;

  static create(input: LightCreateInput): Light {
    const { sensorId, isOn } = input;

    const _this = new Light();

    _this.create();

    _this.sensorId = sensorId;
    _this.isOn = isOn;

    return _this;
  }
}
