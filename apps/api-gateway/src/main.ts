import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { QueuesEnum } from '@tasty.backend/libs/common/src/domain';
import { rabbitmqOptions } from '@tasty.backend/libs/common/src/infrastructure/communication';
import { config } from 'dotenv';
async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice(rabbitmqOptions(QueuesEnum.ApiGateway));

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
Logger.log('Api Gateway started :)');
