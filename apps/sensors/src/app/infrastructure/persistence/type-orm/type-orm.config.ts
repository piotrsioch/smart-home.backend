import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL || 'mongodb://mongo:27017/sensors',
  synchronize: process.env.SYNCHRONIZE_DB === 'true',
  useUnifiedTopology: true,
  entities: [DhtSensorEntity],
};
