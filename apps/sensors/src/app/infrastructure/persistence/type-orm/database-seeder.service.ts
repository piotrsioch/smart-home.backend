import { Injectable } from '@nestjs/common';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { SensorSeeder } from './seeders/sensor.seeder';
import { PirSensorSeeder } from './seeders/pir-sensor.seeder';
import { SmokeSensorSeeder } from './seeders/smoke-sensor.seeder';
import { ReedSwitchSeeder } from './seeders/reed-switch.seeder';
import { LightSeeder } from './seeders/light.seeder';
import { IDatabaseSeederService } from '@smart-home.backend/libs/common';
import { AlarmSeeder } from './seeders/alarm.seeder';
import { EspSensorSeeder } from './seeders/esp-sensor.seeder';
import { RoomSeeder } from './seeders/room.seeder';

@Injectable()
export class DatabaseSeederService implements IDatabaseSeederService {
  constructor(
    private readonly dhtSensorSeeder: DhtSensorSeeder,
    private readonly sensorSeeder: SensorSeeder,
    private readonly pirSensorSeeder: PirSensorSeeder,
    private readonly smokeSensorSeeder: SmokeSensorSeeder,
    private readonly reedSwitchSeeder: ReedSwitchSeeder,
    private readonly lightSeeder: LightSeeder,
    private readonly alarmSeeder: AlarmSeeder,
    private readonly espSensorSeeder: EspSensorSeeder,
    private readonly roomSeeder: RoomSeeder,
  ) {}

  async seedAllEntities(): Promise<void> {
    await this.dhtSensorSeeder.seed();
    await this.sensorSeeder.seed();
    await this.pirSensorSeeder.seed();
    await this.smokeSensorSeeder.seed();
    await this.reedSwitchSeeder.seed();
    await this.lightSeeder.seed();
    await this.alarmSeeder.seed();
    await this.roomSeeder.seed();

    console.log('Seeding all entities in sensors microservice ended');
  }

  async seedEspSensor(): Promise<void> {
    await this.espSensorSeeder.seed();
  }
}
