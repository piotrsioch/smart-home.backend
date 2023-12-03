import { BaseModel } from '@smart-home.backend/libs/common';

export type DhtSensorCreateInput = {
  sensorId: string;
  temperature: string;
  humidity: string;
};

export class DhtSensor extends BaseModel {
  sensorId: string;
  temperature: string;
  humidity: string;

  static create(input: DhtSensorCreateInput) {
    const { temperature, humidity, sensorId } = input;

    const _this = new DhtSensor();

    _this.create();

    _this.temperature = temperature;
    _this.humidity = humidity;
    _this.sensorId = sensorId;

    return _this;
  }
}
