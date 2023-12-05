import { IDatabaseSeederService } from '../../../application';
import { Injectable } from '@nestjs/common';
import { DhtSensorSeeder } from './seeders/dht-sensor.seeder';

@Injectable()
export class DatabaseSeederService implements IDatabaseSeederService {
  constructor(private readonly dhtSensorSeeder: DhtSensorSeeder) {}

  async seedAllEntities(): Promise<void> {
    await this.dhtSensorSeeder.seed();
    console.log('Seeding all entities ended');
  }
}
