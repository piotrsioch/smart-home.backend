import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { QueuesEnum } from '@smart-home.backend/libs/common/src/domain';
import { rabbitmqOptions } from '@smart-home.backend/libs/common/src/infrastructure/communication';
import { config } from 'dotenv';

const port = process.env.PORT ?? 4001;

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(rabbitmqOptions(QueuesEnum.API_GATEWAY));

  await app.startAllMicroservices();

  await app.listen(port);
}

bootstrap();
Logger.log(`Api Gateway running on ${port}`);
Logger.log('Api Gateway started :)');
