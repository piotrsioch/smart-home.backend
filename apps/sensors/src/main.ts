import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { Logger } from '@nestjs/common';
import { rabbitmqOptions } from '@smart-home.backend/libs/common/src/infrastructure/communication';
import { QueuesEnum } from '@smart-home.backend/libs/common/src/domain';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const app = await NestFactory.createMicroservice(AppModule, rabbitmqOptions(QueuesEnum.SENSORS));

  await app.listen();
}

bootstrap();
Logger.log('Sensors microservice started');
