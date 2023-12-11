import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SensorEntity } from './entities/sensor.entity';
import { PirSensorEntity } from './entities/pir-sensor.entity';
import { SmokeSensorEntity } from './entities/smoke-sensor.entity';
import { ReedSwitchEntity } from './entities/reed-switch.entity';
import { LightEntity } from './entities/light.entity';
import { AlarmEntity } from './entities/alarm.entity';

const commonOptions: Partial<TypeOrmModuleOptions> = {
  entities: [
    DhtSensorEntity,
    SensorEntity,
    PirSensorEntity,
    SmokeSensorEntity,
    ReedSwitchEntity,
    LightEntity,
    AlarmEntity,
  ],
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
