import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { RoomEntity } from '../entities/room.entity';
import { IRoomRepository } from '../../../../application/room/contracts';

@Injectable()
export class RoomRepository extends GenericRepository<RoomEntity> implements IRoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: Repository<RoomEntity>,
  ) {
    super(repository);
  }
}
