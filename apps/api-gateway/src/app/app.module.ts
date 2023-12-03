import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceEnum, QueuesEnum } from '@smart-home.backend/libs/common/src/domain';
import { UsersModule } from './users/users.module';
import { SensorsModule } from './sensors/sensors.module';

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceEnum.ApiGateway,
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
    SensorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
