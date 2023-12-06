import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface IReedSwitchRepository extends IGenericRepository<any> {}

export abstract class IReedSwitchRepository implements IReedSwitchRepository {}
