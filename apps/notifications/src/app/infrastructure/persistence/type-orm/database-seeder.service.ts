import { Injectable } from '@nestjs/common';
import { IDatabaseSeederService } from '@smart-home.backend/libs/common';
import { NotificationSeeder } from './seeders/notification.seeder';

@Injectable()
export class DatabaseSeederService implements IDatabaseSeederService {
  constructor(private readonly notificationSeeder: NotificationSeeder) {}

  async seedAllEntities(): Promise<void> {
    await this.notificationSeeder.seed();

    console.log('Seeding all entities in notifications microservice ended');
  }
}
