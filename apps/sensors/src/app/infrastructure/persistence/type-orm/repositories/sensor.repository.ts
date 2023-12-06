import { Injectable } from '@nestjs/common';
import { ISensorRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { SensorEntity } from '../entities/sensor.entity';

@Injectable()
export class SensorRepository extends GenericRepository<SensorEntity> implements ISensorRepository {
  constructor(
    @InjectRepository(SensorEntity)
    private readonly repository: Repository<SensorEntity>,
  ) {
    super(repository);
  }
}
