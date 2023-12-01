import { QueuesEnum } from './queues.enum';
import { ServiceEnum } from './service.enum';

export const ServiceQueueMap: { [key in ServiceEnum]: QueuesEnum } = {
  [ServiceEnum.ApiGateway]: QueuesEnum.ApiGateway,
  [ServiceEnum.Users]: QueuesEnum.Users,
  [ServiceEnum.Sensors]: QueuesEnum.Sensors,
};
