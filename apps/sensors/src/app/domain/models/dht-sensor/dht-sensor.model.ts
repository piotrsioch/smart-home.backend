import { BaseModel } from '@smart-home.backend/libs/common';

export type DhtSensorCreateInput = {
  sensorId: string;
  temperature: number;
  humidity: number;
};

export class DhtSensor extends BaseModel {
  sensorId: string;
  temperature: number;
  humidity: number;

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
