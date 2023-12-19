import { IBaseSensorRepository } from './base-sensor.repository.interface';

export interface IReedSwitchRepository extends IBaseSensorRepository {}

export abstract class IReedSwitchRepository implements IReedSwitchRepository {}
