import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli.module';
import { DatabaseSeederService } from './app/infrastructure/persistence/type-orm/database-seeder.service';

async function bootstrap() {
  process.env.DB_URL = 'mongodb://localhost:27017/sensors';

  const app = await NestFactory.createApplicationContext(CliModule);

  const seederService = app.get(DatabaseSeederService);

  await seederService.seedAllEntities();
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
