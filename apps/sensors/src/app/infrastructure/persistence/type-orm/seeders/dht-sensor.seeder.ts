import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';
import { DhtSensorFactory } from '../factories/dht-sensor.factory';

@Injectable()
export class DhtSensorSeeder {
  constructor(
    @InjectRepository(DhtSensorEntity)
    private readonly dhtSensorRepository: Repository<DhtSensorEntity>,
    private readonly dhtSensorFactory: DhtSensorFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.dhtSensorFactory.create();

      await this.dhtSensorRepository.save(sensor);
    }

    console.log('Seeding for dht sensor ended.');
  }
}
