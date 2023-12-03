import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { typeOrmConfig } from './type-orm.config';
import { DhtSensorRepository } from './repositories/dht-sensor.repository';
import { IDhtSensorRepository } from '../../../application';

const providers = [
  {
    provide: IDhtSensorRepository,
    useClass: DhtSensorRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([DhtSensorEntity])],
  providers: [DhtSensorSeeder, ...providers],
  exports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([DhtSensorEntity]),
    ...providers,
  ],
})
export class CustomTypeOrmModule {}
