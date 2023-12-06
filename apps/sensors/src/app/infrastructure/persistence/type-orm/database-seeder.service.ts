import { IDatabaseSeederService } from '../../../application';
import { Injectable } from '@nestjs/common';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';
import { SensorSeeder } from './seeders/sensor.seeder';

@Injectable()
export class DatabaseSeederService implements IDatabaseSeederService {
  constructor(
    private readonly dhtSensorSeeder: DhtSensorSeeder,
    private readonly sensorSeeder: SensorSeeder,
  ) {}

  async seedAllEntities(): Promise<void> {
    await this.dhtSensorSeeder.seed();
    await this.sensorSeeder.seed();

    console.log('Seeding all entities ended');
  }
}
