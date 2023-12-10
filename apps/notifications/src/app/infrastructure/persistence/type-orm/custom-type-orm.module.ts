import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import typeOrmConfig from './type-orm.config';
import { GenericRepository, IGenericRepository } from '@smart-home.backend/libs/common';
import { DatabaseSeederService } from './database-seeder.service';
import { INotificationRepository } from '../../../application/contracts/repositories';
import { NotificationRepository } from './repositories/notification.repository';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationSeeder } from './seeders/notification.seeder';
import { NotificationFactory } from './factories/notification.factory';

const entities = [NotificationEntity];
const seeders = [NotificationSeeder];
const factories = [NotificationFactory];

const providers = [
  {
    provide: IGenericRepository,
    useClass: GenericRepository,
  },
  {
    provide: INotificationRepository,
    useClass: NotificationRepository,
  },
  ...seeders,
  ...factories,
];

const typeOrmModule = TypeOrmModule.forRoot(typeOrmConfig);

@Module({
  imports: [typeOrmModule, TypeOrmModule.forFeature([...entities])],
  providers: [...providers, DatabaseSeederService],
  exports: [typeOrmModule, TypeOrmModule.forFeature([...entities]), ...providers],
})
export class CustomTypeOrmModule {}
