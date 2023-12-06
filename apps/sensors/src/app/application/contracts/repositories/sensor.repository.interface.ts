import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface ISensorRepository extends IGenericRepository<any> {}

export abstract class ISensorRepository implements ISensorRepository {}
