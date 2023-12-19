import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/room.entity';
import { RoomFactory } from '../factories/room.factory';

@Injectable()
export class RoomSeeder {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    private readonly roomFactory: RoomFactory,
  ) {}

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const sensor = this.roomFactory.create();

      await this.roomRepository.save(sensor);
    }

    console.log('Seeding for room ended.');
  }
}
