import { Injectable } from '@nestjs/common';
import { IPirSensorRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { PirSensorEntity } from '../entities/pir-sensor.entity';

@Injectable()
export class PirSensorRepository
  extends GenericRepository<PirSensorEntity>
  implements IPirSensorRepository
{
  constructor(
    @InjectRepository(PirSensorEntity)
    private readonly repository: Repository<PirSensorEntity>,
  ) {
    super(repository);
  }
}
