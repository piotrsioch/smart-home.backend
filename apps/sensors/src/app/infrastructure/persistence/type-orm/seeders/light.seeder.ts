import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightEntity } from '../entities/light.entity';
import { LightFactory } from '../factories/light.factory';

@Injectable()
export class LightSeeder {
  constructor(
    @InjectRepository(LightEntity)
    private readonly lightRepository: Repository<LightEntity>,
    private readonly lightFactory: LightFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.lightFactory.create();

      await this.lightRepository.save(sensor);
    }

    console.log('Seeding for light ended.');
  }
}
