import { Module } from '@nestjs/common';
import { PersistenceModule } from './app/infrastructure/persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
})
export class CliModule {}
