import { IDatabaseSeederService } from '../../../application';
import { Injectable } from '@nestjs/common';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { SensorSeeder } from './seeders/sensor.seeder';
import { PirSensorSeeder } from './seeders/pir-sensor.seeder';
import { SmokeSensorSeeder } from './seeders/smoke-sensor.seeder';
import { ReedSwitchSeeder } from './seeders/reed-switch.seeder';

@Injectable()
export class DatabaseSeederService implements IDatabaseSeederService {
  constructor(
    private readonly dhtSensorSeeder: DhtSensorSeeder,
    private readonly sensorSeeder: SensorSeeder,
    private readonly pirSensorSeeder: PirSensorSeeder,
    private readonly smokeSensorSeeder: SmokeSensorSeeder,
    private readonly reedSwitchSeeder: ReedSwitchSeeder,
  ) {}

  async seedAllEntities(): Promise<void> {
    await this.dhtSensorSeeder.seed();
    await this.sensorSeeder.seed();
    await this.pirSensorSeeder.seed();
    await this.smokeSensorSeeder.seed();
    await this.reedSwitchSeeder.seed();

    console.log('Seeding all entities ended');
  }
}
