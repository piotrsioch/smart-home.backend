import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { DatabaseSeederService } from '../app/infrastructure/persistence/type-orm/database-seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const seederService = app.get(DatabaseSeederService);

  await seederService.seedEspSensor();

  await app.close();
}

bootstrap().catch((error) => {
  console.error('Seeding failed', error);

  process.exit(1);
});
