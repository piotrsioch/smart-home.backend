import { IBaseSensorRepository } from './base-sensor.repository.interface';

export interface ILightRepository extends IBaseSensorRepository {}

export abstract class ILightRepository implements ILightRepository {}
