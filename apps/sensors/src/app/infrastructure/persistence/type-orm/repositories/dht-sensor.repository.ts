import { Injectable } from '@nestjs/common';
import { IDhtSensorRepository } from '../../../../application';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseSensorRepository } from './base-sensor.repository';

@Injectable()
export class DhtSensorRepository
  extends BaseSensorRepository<DhtSensorEntity>
  implements IDhtSensorRepository
{
  constructor(
    @InjectRepository(DhtSensorEntity)
    private readonly repository: Repository<DhtSensorEntity>,
  ) {
    super(repository);
  }
}
