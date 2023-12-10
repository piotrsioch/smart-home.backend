import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from './type-orm';

@Module({
  imports: [CustomTypeOrmModule],
  exports: [CustomTypeOrmModule],
})
export class PersistenceModule {}
