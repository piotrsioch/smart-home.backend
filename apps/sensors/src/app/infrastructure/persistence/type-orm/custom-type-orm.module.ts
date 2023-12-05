import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { DhtSensorRepository } from './repositories/dht-sensor.repository';
import { IDhtSensorRepository } from '../../../application';
import { DhtSensorFactory } from './factories/dht-sensor.factory';
import { ConfigModule, ConfigService } from '@nestjs/config';

const providers = [
  {
    provide: IDhtSensorRepository,
    useClass: DhtSensorRepository,
  },
  DhtSensorFactory,
  DhtSensorSeeder,
];

const typeOrmConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mongodb',
    url: configService.get<string>('DB_URL'),
    synchronize: configService.get<string>('SYNCHRONIZE_DB') === 'true',
    useUnifiedTopology: true,
    entities: [DhtSensorEntity],
  }),
  inject: [ConfigService],
});

@Module({
  imports: [typeOrmConfig, TypeOrmModule.forFeature([DhtSensorEntity])],
  providers: [DhtSensorSeeder, ...providers],
  exports: [typeOrmConfig, TypeOrmModule.forFeature([DhtSensorEntity]), ...providers],
})
export class CustomTypeOrmModule {}
