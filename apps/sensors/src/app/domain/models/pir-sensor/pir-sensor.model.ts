import { BaseModel } from '@smart-home.backend/libs/common';
import { PirSensorMovementDetectedDomainEvent } from '../../events';

export type PirSensorCreateInput = {
  sensorId: string;
};

export class PirSensor extends BaseModel {
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
