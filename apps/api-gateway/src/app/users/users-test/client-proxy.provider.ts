// This is only temporary to check connection between microservices

// client-proxy.provider.ts
import { ClientProxy, ClientProxyFactory, RmqOptions, Transport } from '@nestjs/microservices';
import { Provider } from '@nestjs/common';
import { MicroservicesNamesEnum } from '@tasty.backend/libs/common/src/domain';

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

export const clientProxyProvider: Provider = {
  provide: MicroservicesNamesEnum.Users,
  useFactory: (): ClientProxy => {
    const options: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: 'users_queue',
        queueOptions: {
          durable: true,
        },
      },
    };
    return ClientProxyFactory.create(options);
  },
};
