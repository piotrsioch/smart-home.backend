import { QueuesEnum } from './queues.enum';
import { ServiceEnum } from './service.enum';

export const ServiceQueueMap: { [key in ServiceEnum]: QueuesEnum } = {
  [ServiceEnum.Comments]: QueuesEnum.Comments,
  [ServiceEnum.Payments]: QueuesEnum.Payments,
  [ServiceEnum.Posts]: QueuesEnum.posts,
  [ServiceEnum.Users]: QueuesEnum.Users,
  [ServiceEnum.ApiGateway]: QueuesEnum.ApiGateway,
};
