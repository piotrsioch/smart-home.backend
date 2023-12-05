import { NestFactory } from '@nestjs/core';
import { DhtSensorSeeder } from './app/infrastructure/persistence/type-orm/seeders/dht-sensor.seeder';
import { CustomTypeOrmModule } from "./app/infrastructure/persistence/type-orm";
import { config } from "dotenv";
import { AppModule } from "./app";

async function bootstrap() {
  config();
  process.env.DB_URL = 'mongodb://mongo:27017/sensors';
  console.log(process.env.DB_URL);
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('get seeder');
  const seeder = app.get(DhtSensorSeeder);
  console.log('seed');
  await seeder.seed();
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
