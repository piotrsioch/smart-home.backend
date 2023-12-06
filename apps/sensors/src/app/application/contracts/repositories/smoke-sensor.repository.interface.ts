import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface ISmokeSensorRepository extends IGenericRepository<any> {}

export abstract class ISmokeSensorRepository implements ISmokeSensorRepository {}
