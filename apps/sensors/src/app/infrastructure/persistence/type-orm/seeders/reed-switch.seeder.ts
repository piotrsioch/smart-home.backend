import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReedSwitchEntity } from '../entities/reed-switch.entity';
import { ReedSwitchFactory } from '../factories/reed-switch.factory';

@Injectable()
export class ReedSwitchSeeder {
  constructor(
    @InjectRepository(ReedSwitchEntity)
    private readonly reedSwitchRepository: Repository<ReedSwitchEntity>,
    private readonly reedSwitchFactory: ReedSwitchFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.reedSwitchFactory.create();

      await this.reedSwitchRepository.save(sensor);
    }

    console.log('Seeding for reed switch ended.');
  }
}
