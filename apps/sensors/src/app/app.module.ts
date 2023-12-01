import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueuesEnum, ServiceEnum } from '@smart-home.backend/libs/common/src/domain';

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceEnum.Users,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueuesEnum.Users,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
