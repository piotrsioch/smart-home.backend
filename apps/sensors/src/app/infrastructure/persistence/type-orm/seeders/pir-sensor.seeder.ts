import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PirSensorEntity } from '../entities/pir-sensor.entity';
import { PirSensorFactory } from '../factories/pir-sensor.factory';

@Injectable()
export class PirSensorSeeder {
  constructor(
    @InjectRepository(PirSensorEntity)
    private readonly pirSensorRepository: Repository<PirSensorEntity>,
    private readonly pirSensorFactory: PirSensorFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.pirSensorFactory.create();

      await this.pirSensorRepository.save(sensor);
    }

    console.log('Seeding for pir sensor ended.');
  }
}
