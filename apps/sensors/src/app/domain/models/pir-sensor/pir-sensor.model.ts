import { BaseModel } from '@smart-home.backend/libs/common';
import { DhtSensor } from '../dht-sensor';
import { PirSensorMoveDetectedDomainEvent } from '../../events';

export type PirSensorCreateInput = {
  sensorId: string;
};

export class PirSensor extends BaseModel {
  sensorId: string;

  static create(input: PirSensorCreateInput): PirSensor {
    const { sensorId } = input;

    const _this = new DhtSensor();

    _this.create();

    _this.sensorId = sensorId;

    _this.apply(new PirSensorMoveDetectedDomainEvent(_this));

    return _this;
  }
}
