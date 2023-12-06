import { Injectable } from '@nestjs/common';
import { IReedSwitchRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { ReedSwitchEntity } from '../entities/reed-switch.entity';

@Injectable()
export class ReedSwitchRepository
  extends GenericRepository<ReedSwitchEntity>
  implements IReedSwitchRepository
{
  constructor(
    @InjectRepository(ReedSwitchEntity)
    private readonly repository: Repository<ReedSwitchEntity>,
  ) {
    super(repository);
  }
}
