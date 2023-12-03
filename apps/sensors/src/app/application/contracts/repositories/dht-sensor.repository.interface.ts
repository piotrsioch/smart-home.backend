import { IModelRepository } from '@smart-home.backend/libs/common';
import { DhtSensor } from '../../../domain/models';

export interface IDhtSensorRepository extends IModelRepository<DhtSensor> {
  _marker: true;
}
