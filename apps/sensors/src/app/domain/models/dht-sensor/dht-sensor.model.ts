import { BaseSensor } from '../base-sensor';

export type DhtSensorCreateInput = {
  sensorId: string;
  temperature: number;
  humidity: number;
};

export class DhtSensor extends BaseSensor {
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
