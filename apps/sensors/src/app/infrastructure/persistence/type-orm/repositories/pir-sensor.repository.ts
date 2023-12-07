import { Injectable } from '@nestjs/common';
import { IPirSensorRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PirSensorEntity } from '../entities/pir-sensor.entity';
import { BaseSensorRepository } from './base-sensor.repository';

@Injectable()
export class PirSensorRepository
  extends BaseSensorRepository<PirSensorEntity>
  implements IPirSensorRepository
{
  constructor(
    @InjectRepository(PirSensorEntity)
    private readonly repository: Repository<PirSensorEntity>,
  ) {
    super(repository);
  }
}
