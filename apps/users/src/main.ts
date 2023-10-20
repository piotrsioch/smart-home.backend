import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { rabbitmqOptions } from '@tasty.backend/libs/common/src/infrastructure/communication';
import { QueuesEnum } from '@tasty.backend/libs/common/src/domain';

async function bootstrap() {
  config();

  const app = await NestFactory.createMicroservice(AppModule, rabbitmqOptions(QueuesEnum.Users));

  await app.listen();
}

bootstrap();
Logger.log('Users microservice started');
