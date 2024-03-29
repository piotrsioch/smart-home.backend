import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DhtSensorEntity } from './entities/dht-sensor.entity';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { DhtSensorRepository } from './repositories/dht-sensor.repository';
import { IAlarmRepository } from '../../../application/sensors/contracts/repositories/alarm.repository.interface';
import { IDhtSensorRepository } from '../../../application/sensors/contracts/repositories/dht-sensor.repository.interface';
import { ISensorRepository } from '../../../application/sensors/contracts/repositories/sensor.repository.interface';
import { IPirSensorRepository } from '../../../application/sensors/contracts/repositories/pir-sensor.repository.interface';
import { IReedSwitchRepository } from '../../../application/sensors/contracts/repositories/reed-switch.repository.interface';
import { ILightRepository } from '../../../application/sensors/contracts/repositories/light.repository.interface';
import { DhtSensorFactory } from './factories/dht-sensor.factory';
import { typeOrmConfig } from './type-orm.config';
import { DatabaseSeederService } from './database-seeder.service';
import { SensorSeeder } from './seeders/sensor.seeder';
import { SensorFactory } from './factories/sensor.factory';
import { SensorRepository } from './repositories/sensor.repository';
import { SensorEntity } from './entities/sensor.entity';
import { PirSensorEntity } from './entities/pir-sensor.entity';
import { PirSensorSeeder } from './seeders/pir-sensor.seeder';
import { PirSensorFactory } from './factories/pir-sensor.factory';
import { PirSensorRepository } from './repositories/pir-sensor.repository';
import { SmokeSensorEntity } from './entities/smoke-sensor.entity';
import { SmokeSensorSeeder } from './seeders/smoke-sensor.seeder';
import { SmokeSensorFactory } from './factories/smoke-sensor.factory';
import { ISmokeSensorRepository } from '../../../application/sensors/contracts/repositories/smoke-sensor.repository.interface';
import { SmokeSensorRepository } from './repositories/smoke-sensor.repository';
import { ReedSwitchEntity } from './entities/reed-switch.entity';
import { ReedSwitchSeeder } from './seeders/reed-switch.seeder';
import { ReedSwitchFactory } from './factories/reed-switch.factory';
import { ReedSwitchRepository } from './repositories/reed-switch.repository';
import { LightEntity } from './entities/light.entity';
import { LightSeeder } from './seeders/light.seeder';
import { LightFactory } from './factories/light.factory';
import { LightRepository } from './repositories/light.repository';
import { IDatabaseSeederService } from '@smart-home.backend/libs/common';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmSeeder } from './seeders/alarm.seeder';
import { AlarmFactory } from './factories/alarm.factory';
import { AlarmRepository } from './repositories/alarm.repository';
import { EspSensorSeeder } from './seeders/esp-sensor.seeder';
import { IRoomRepository } from '../../../application/room/contracts/repositories/room.repository.interface';
import { RoomRepository } from './repositories/room.repository';
import { RoomFactory } from './factories/room.factory';
import { RoomSeeder } from './seeders/room.seeder';
import { RoomEntity } from './entities/room.entity';

const entities = [
  DhtSensorEntity,
  SensorEntity,
  PirSensorEntity,
  SmokeSensorEntity,
  ReedSwitchEntity,
  LightEntity,
  AlarmEntity,
  RoomEntity,
];
const seeders = [
  DhtSensorSeeder,
  SensorSeeder,
  PirSensorSeeder,
  SmokeSensorSeeder,
  ReedSwitchSeeder,
  LightSeeder,
  AlarmSeeder,
  EspSensorSeeder,
  RoomSeeder,
];
const factories = [
  DhtSensorFactory,
  SensorFactory,
  PirSensorFactory,
  SmokeSensorFactory,
  ReedSwitchFactory,
  LightFactory,
  AlarmFactory,
  RoomFactory,
];

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
    provide: IPirSensorRepository,
    useClass: PirSensorRepository,
  },
  {
    provide: ISmokeSensorRepository,
    useClass: SmokeSensorRepository,
  },
  {
    provide: IReedSwitchRepository,
    useClass: ReedSwitchRepository,
  },
  {
    provide: IDatabaseSeederService,
    useClass: DatabaseSeederService,
  },
  {
    provide: ILightRepository,
    useClass: LightRepository,
  },
  {
    provide: IAlarmRepository,
    useClass: AlarmRepository,
  },
  {
    provide: IRoomRepository,
    useClass: RoomRepository,
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
