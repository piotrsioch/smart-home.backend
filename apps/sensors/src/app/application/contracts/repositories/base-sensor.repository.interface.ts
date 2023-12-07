import { IGenericRepository } from '@smart-home.backend/libs/common';

export type findLatestData = {
  sensorId: string;
};

export interface IBaseSensorRepository extends IGenericRepository<any> {
  findLatestData(data: findLatestData): Promise<any>;
}

export abstract class IBaseSensorRepository implements IBaseSensorRepository {}
