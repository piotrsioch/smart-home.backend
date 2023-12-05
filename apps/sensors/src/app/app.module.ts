import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueuesEnum, ServiceEnum } from '@smart-home.backend/libs/common/src/domain';
import { ApiModule } from './api';
import { ConfigModule } from '@nestjs/config';

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    ClientsModule.register([
      {
        name: ServiceEnum.Sensors,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueuesEnum.Sensors,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class AppModule {}
