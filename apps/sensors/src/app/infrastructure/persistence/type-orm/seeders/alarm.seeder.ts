import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmFactory } from '../factories/alarm.factory';

@Injectable()
export class AlarmSeeder {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.alarmFactory.create();

      await this.alarmRepository.save(sensor);
    }

    console.log('Seeding for alarm ended.');
  }
}
