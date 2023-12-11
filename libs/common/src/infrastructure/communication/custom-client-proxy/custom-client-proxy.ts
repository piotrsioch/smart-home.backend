import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RmqOptions, Transport } from '@nestjs/microservices';
import { ServiceEnum, ServiceQueueMap } from '@smart-home.backend/libs/common/src/domain';

export type CustomClientSendInput = {
  services: ServiceEnum[];
  data?: any;
  pattern: string;
};

export type CustomClientEmitInput = {
  receivers: ServiceEnum[];
  data?: any;
  pattern: string;
};

export type CustomClientSendToInput = Omit<CustomClientSendInput, 'services'>;

@Injectable()
export class CustomClientProxy implements OnModuleInit {
  private clientProxies: Map<ServiceEnum, ClientProxy> = new Map();

  onModuleInit(): void {
    const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
    const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

    const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

    Object.entries(ServiceQueueMap).forEach(([service, queue]) => {
      const options: RmqOptions = {
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue,
          queueOptions: {
            durable: true,
          },
        },
      };
      this.clientProxies.set(service as ServiceEnum, ClientProxyFactory.create(options));
    });
  }

  send<R = any>(input: CustomClientSendInput): Promise<R[]> {
    const { services, data, pattern } = input;
    return Promise.all(
      services.map((service) => {
        return this.clientProxies
          .get(service)
          .send(pattern, data ?? '')
          .toPromise();
      }),
    );
  }

  sendTo<R>(service: ServiceEnum, input: CustomClientSendToInput): Promise<R> {
    return this.send({
      services: [service],
      ...input,
    }).then((results) => results[0]);
  }

  emit(input: CustomClientEmitInput): void {
    const { receivers, data, pattern } = input;

    receivers.forEach((service) => {
      const clientProxy = this.clientProxies.get(service);
      if (clientProxy) {
        clientProxy.emit(pattern, data ?? '').toPromise();
      }
    });
  }
}
