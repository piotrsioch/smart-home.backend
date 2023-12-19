import { IBaseSensorRepository } from './base-sensor.repository.interface';

export interface ISmokeSensorRepository extends IBaseSensorRepository {}

export abstract class ISmokeSensorRepository implements ISmokeSensorRepository {}
