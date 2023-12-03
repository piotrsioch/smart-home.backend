import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface IDhtSensorRepository extends IGenericRepository<any> {}

export abstract class IDhtSensorRepository implements IDhtSensorRepository {}
