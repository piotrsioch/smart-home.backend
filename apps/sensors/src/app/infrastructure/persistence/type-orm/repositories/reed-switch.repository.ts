import { Injectable } from '@nestjs/common';
import { IReedSwitchRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReedSwitchEntity } from '../entities/reed-switch.entity';
import { BaseSensorRepository } from './base-sensor.repository';

@Injectable()
export class ReedSwitchRepository
  extends BaseSensorRepository<ReedSwitchEntity>
  implements IReedSwitchRepository
{
  constructor(
    @InjectRepository(ReedSwitchEntity)
    private readonly repository: Repository<ReedSwitchEntity>,
  ) {
    super(repository);
  }
}
