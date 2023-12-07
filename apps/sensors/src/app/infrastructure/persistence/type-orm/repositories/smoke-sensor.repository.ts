import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISmokeSensorRepository } from '../../../../application';
import { SmokeSensorEntity } from '../entities/smoke-sensor.entity';
import { BaseSensorRepository } from './base-sensor.repository';

@Injectable()
export class SmokeSensorRepository
  extends BaseSensorRepository<SmokeSensorEntity>
  implements ISmokeSensorRepository
{
  constructor(
    @InjectRepository(SmokeSensorEntity)
    private readonly repository: Repository<SmokeSensorEntity>,
  ) {
    super(repository);
  }
}
