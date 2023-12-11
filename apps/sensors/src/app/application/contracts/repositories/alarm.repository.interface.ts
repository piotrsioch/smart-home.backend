import { IBaseSensorRepository } from './base-sensor.repository.interface';

export interface IAlarmRepository extends IBaseSensorRepository {}

export abstract class IAlarmRepository implements IAlarmRepository {}
