import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { typeOrmConfig } from './type-orm.config';
import { DhtSensorRepository } from './repositories/dht-sensor.repository';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([DhtSensorEntity])],
  providers: [
    {
      provide: 'IDhtSensorRepository',
      useClass: DhtSensorRepository,
    },
    DhtSensorSeeder,
  ],
  exports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([DhtSensorEntity])],
})
export class CustomTypeOrmModule {}
