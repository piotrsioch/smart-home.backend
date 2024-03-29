import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceEnum, QueuesEnum } from '@smart-home.backend/libs/common/src/domain';
import { UsersTestController } from './api/users-test/users-test.controller';

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceEnum.USERS,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueuesEnum.USERS,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersTestController],
  providers: [],
})
export class AppModule {}
