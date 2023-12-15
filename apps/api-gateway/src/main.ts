import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { QueuesEnum } from '@smart-home.backend/libs/common/src/domain';
import { rabbitmqOptions } from '@smart-home.backend/libs/common/src/infrastructure/communication';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

const port = process.env.PORT ?? 4001;

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.connectMicroservice(rabbitmqOptions(QueuesEnum.API_GATEWAY));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Smarthome.Backend')
    .setDescription('API Description for Smarthome.Backend')
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(
    cors({
      origin: 'http://localhost:4200',
    }),
  );

  await app.startAllMicroservices();

  await app.listen(port);
}

bootstrap();
Logger.log(`Api Gateway running on ${port}`);
Logger.log('Api Gateway started :)');
