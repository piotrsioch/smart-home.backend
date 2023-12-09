import { QueuesEnum } from './queues.enum';
import { ServiceEnum } from './service.enum';

export const ServiceQueueMap: { [key in ServiceEnum]: QueuesEnum } = {
  [ServiceEnum.ApiGateway]: QueuesEnum.API_GATEWAY,
  [ServiceEnum.Users]: QueuesEnum.USERS,
  [ServiceEnum.Sensors]: QueuesEnum.SENSORS,
  [ServiceEnum.NOTIFICATIONS]: QueuesEnum.NOTIFICATIONS,
};
