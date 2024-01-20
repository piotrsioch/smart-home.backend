import { IGenericRepository } from '@smart-home.backend/libs/common';
import { Notification } from '../../../domain';

export interface INotificationRepository extends IGenericRepository<any> {
  findNotificationCreatedInGivenMinutes(
    sensorId: string,
    minutes: number,
  ): Promise<Notification | null>;
}

export abstract class INotificationRepository implements INotificationRepository {}
