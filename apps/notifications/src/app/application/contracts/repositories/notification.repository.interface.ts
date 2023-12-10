import { IGenericRepository } from '@smart-home.backend/libs/common';

export interface INotificationRepository extends IGenericRepository<any> {}

export abstract class INotificationRepository implements INotificationRepository {}
