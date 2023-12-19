import { IBaseSensorRepository } from './base-sensor.repository.interface';

export interface IDhtSensorRepository extends IBaseSensorRepository {}

export abstract class IDhtSensorRepository implements IDhtSensorRepository {}
