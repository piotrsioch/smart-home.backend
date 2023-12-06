import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorFactory } from '../factories/sensor.factory';
import { SensorEntity } from '../entities/sensor.entity';

@Injectable()
export class SensorSeeder {
  constructor(
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>,
    private readonly sensorFactory: SensorFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.sensorFactory.create();

      await this.sensorRepository.save(sensor);
    }

    console.log('Seeding for sensor entity ended.');
  }
}
