import { PirSensorMovementDetectedDomainEvent } from '../../events';
import { BaseSensor } from '../base-sensor';

export type PirSensorCreateInput = {
  sensorId: string;
};

export class PirSensor extends BaseSensor {
  sensorId: string;

  static create(input: PirSensorCreateInput): PirSensor {
    const { sensorId } = input;

    const _this = new PirSensor();

    _this.create();

    _this.sensorId = sensorId;

    _this.apply(new PirSensorMovementDetectedDomainEvent(_this));

    return _this;
  }
}
