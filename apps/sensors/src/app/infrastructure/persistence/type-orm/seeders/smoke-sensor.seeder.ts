import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmokeSensorEntity } from '../entities/smoke-sensor.entity';
import { SmokeSensorFactory } from '../factories/smoke-sensor.factory';

@Injectable()
export class SmokeSensorSeeder {
  constructor(
    @InjectRepository(SmokeSensorEntity)
    private readonly smokeSensorRepository: Repository<SmokeSensorEntity>,
    private readonly smokeSensorFactory: SmokeSensorFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.smokeSensorFactory.create();

      await this.smokeSensorRepository.save(sensor);
    }

    console.log('Seeding for smoke sensor ended.');
  }
}
