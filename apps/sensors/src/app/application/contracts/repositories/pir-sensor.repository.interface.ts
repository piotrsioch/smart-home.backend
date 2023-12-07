import { IBaseSensorRepository } from './base-sensor.repository.interface';

export interface IPirSensorRepository extends IBaseSensorRepository {}

export abstract class IPirSensorRepository implements IPirSensorRepository {}
