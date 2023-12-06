import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface IPirSensorRepository extends IGenericRepository<any> {}

export abstract class IPirSensorRepository implements IPirSensorRepository {}
