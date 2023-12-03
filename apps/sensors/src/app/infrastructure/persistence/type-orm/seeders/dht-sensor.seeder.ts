import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';

@Injectable()
export class DhtSensorSeeder {
  constructor(
    @InjectRepository(DhtSensorEntity)
    private readonly dhtSensorRepository: Repository<DhtSensorEntity>,
  ) {}

  async seed(): Promise<void> {
    const initialData: any[] = [
      { temperature: '25', humidity: '50' },
      { temperature: '23', humidity: '48' },
    ];

    await Promise.all(
      initialData.map(async (data) => {
        const newSensor = this.dhtSensorRepository.create(data);
        await this.dhtSensorRepository.save(newSensor);
      }),
    );
  }
}
