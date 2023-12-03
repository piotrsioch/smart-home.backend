import { BaseModel } from '@smart-home.backend/libs/common';

export type DhtSensorCreateInput = {
  temperature: string;
  humidity: string;
};

export class DhtSensor extends BaseModel {
  temperature: string;
  humidity: string;

  static create(input: DhtSensorCreateInput) {
    const { temperature, humidity } = input;

    const _this = new DhtSensor();

    _this.create();

    _this.temperature = temperature;
    _this.humidity = humidity;

    return _this;
  }
}
