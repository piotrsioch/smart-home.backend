import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface IRoomRepository extends IGenericRepository<any> {}

export abstract class IRoomRepository implements IRoomRepository {}
