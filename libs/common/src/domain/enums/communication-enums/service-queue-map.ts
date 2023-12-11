import { QueuesEnum } from './queues.enum';
import { ServiceEnum } from './service.enum';

export const ServiceQueueMap: { [key in ServiceEnum]: QueuesEnum } = {
  [ServiceEnum.API_GATEWAY]: QueuesEnum.API_GATEWAY,
  [ServiceEnum.USERS]: QueuesEnum.USERS,
  [ServiceEnum.SENSORS]: QueuesEnum.SENSORS,
  [ServiceEnum.NOTIFICATIONS]: QueuesEnum.NOTIFICATIONS,
};
