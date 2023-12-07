import { Injectable } from '@nestjs/common';
import { ILightRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseSensorRepository } from './base-sensor.repository';
import { LightEntity } from '../entities/light.entity';

@Injectable()
export class LightRepository extends BaseSensorRepository<LightEntity> implements ILightRepository {
  constructor(
    @InjectRepository(LightEntity)
    private readonly repository: Repository<LightEntity>,
  ) {
    super(repository);
  }
}
