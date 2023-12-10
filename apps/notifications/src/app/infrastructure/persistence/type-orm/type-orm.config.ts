import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';

const commonOptions: Partial<TypeOrmModuleOptions> = {
  entities: [NotificationEntity],
  synchronize: process.env.SYNCHRONIZE_DB === 'true',
  useUnifiedTopology: true,
};

const testOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL || 'mongodb://localhost:27017/notifications-test',
};

const devOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL || 'mongodb://localhost:27017/notifications',
};

export const typeOrmConfig: TypeOrmModuleOptions =
  process.env.NODE_ENV === 'test'
    ? { ...commonOptions, ...testOptions }
    : { ...commonOptions, ...devOptions };

export default typeOrmConfig;
