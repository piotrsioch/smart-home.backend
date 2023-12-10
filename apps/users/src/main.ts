import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { rabbitmqOptions } from '@smart-home.backend/libs/common/src/infrastructure/communication';
import { QueuesEnum } from '@smart-home.backend/libs/common/src/domain';

async function bootstrap() {
  config();

  const app = await NestFactory.createMicroservice(AppModule, rabbitmqOptions(QueuesEnum.USERS));

  await app.listen();
}

bootstrap();
Logger.log('Users microservice started');
