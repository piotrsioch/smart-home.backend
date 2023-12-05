import { NestFactory } from '@nestjs/core';
import { DhtSensorSeeder } from './app/infrastructure/persistence/type-orm/seeders/dht-sensor.seeder';
import { CliModule } from "./cli.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  console.log(process.env.DB_URL);

  const app = await NestFactory.createApplicationContext(CliModule);
  const configService = app.get<ConfigService>(ConfigService);

  console.log(configService);
  console.log(configService.get('DB_URL'));

  const seeder = app.get(DhtSensorSeeder);

  await seeder.seed();
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
