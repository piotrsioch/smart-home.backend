import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { DhtSensorRepository } from './repositories/dht-sensor.repository';
import {
  IDatabaseSeederService,
  IDhtSensorRepository,
  ISensorRepository,
} from '../../../application';
import { DhtSensorFactory } from './factories/dht-sensor.factory';
import { typeOrmConfig } from './type-orm.config';
import { DatabaseSeederService } from './database-seeder.service';
import { SensorSeeder } from './seeders/sensor.seeder';
import { SensorFactory } from './factories/sensor.factory';
import { SensorRepository } from './repositories/sensor.repository';
import { SensorEntity } from './entities/sensor.entity';

const entities = [DhtSensorEntity, SensorEntity];
const seeders = [DhtSensorSeeder, SensorSeeder];
const factories = [DhtSensorFactory, SensorFactory];

const providers = [
  {
    provide: IDhtSensorRepository,
    useClass: DhtSensorRepository,
  },
  {
    provide: ISensorRepository,
    useClass: SensorRepository,
  },
  {
    provide: IDatabaseSeederService,
    useClass: DatabaseSeederService,
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
