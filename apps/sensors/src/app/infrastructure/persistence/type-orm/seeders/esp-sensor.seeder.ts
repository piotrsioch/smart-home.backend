import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorEntity } from '../entities/sensor.entity';
import { espSensorsData } from '../../../../../assets';
import { Sensor } from '../../../../domain/models/sensors';

@Injectable()
export class EspSensorSeeder {
  constructor(
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>,
  ) {}

  async seed(): Promise<void> {
    for (const data of espSensorsData) {
      const sensor = Sensor.create(data);

      await this.sensorRepository.save(sensor);
    }

    console.log('Seeding esp sensor data ended');
  }
}
