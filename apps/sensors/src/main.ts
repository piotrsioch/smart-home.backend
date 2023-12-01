import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  config();

  const app = await NestFactory.createMicroservice(AppModule);

  await app.listen();
}

bootstrap();
Logger.log('Sensors microservice started');
