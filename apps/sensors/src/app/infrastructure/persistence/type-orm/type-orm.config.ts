import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const commonOptions: Partial<TypeOrmModuleOptions> = {
  entities: [DhtSensorEntity],
  synchronize: process.env.SYNCHRONIZE_DB === 'true',
  useUnifiedTopology: true,
};

const testOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL || 'mongodb://localhost:27017/sensors-test',
};

const devOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL || 'mongodb://localhost:27017/sensors',
};

export const typeOrmConfig: TypeOrmModuleOptions =
  process.env.NODE_ENV === 'test'
    ? { ...commonOptions, ...testOptions }
    : { ...commonOptions, ...devOptions };

export default typeOrmConfig;