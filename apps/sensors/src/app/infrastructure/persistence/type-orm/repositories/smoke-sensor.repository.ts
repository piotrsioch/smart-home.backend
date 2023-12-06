import { Injectable } from '@nestjs/common';
import { IPirSensorRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { PirSensorEntity } from '../entities/pir-sensor.entity';
import { ISmokeSensorRepository } from '../../../../application/contracts/repositories/smoke-sensor.repository.interface';
import { SmokeSensorEntity } from '../entities/smoke-sensor.entity';

@Injectable()
export class SmokeSensorRepository
  extends GenericRepository<PirSensorEntity>
  implements ISmokeSensorRepository
{
  constructor(
    @InjectRepository(SmokeSensorEntity)
    private readonly repository: Repository<SmokeSensorEntity>,
  ) {
    super(repository);
  }
}
