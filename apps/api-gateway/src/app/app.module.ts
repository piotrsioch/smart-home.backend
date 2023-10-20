import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesNamesEnum, QueuesEnum } from '@tasty.backend/libs/common/src/domain';
import { UsersModule } from './users/users.module';

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MicroservicesNamesEnum.ApiGateway,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueuesEnum.ApiGateway,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
