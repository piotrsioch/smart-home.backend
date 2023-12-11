import { Injectable } from '@nestjs/common';
import { IAlarmRepository } from '../../../../application';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseSensorRepository } from './base-sensor.repository';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class AlarmRepository extends BaseSensorRepository<AlarmEntity> implements IAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly repository: Repository<AlarmEntity>,
  ) {
    super(repository);
  }
}
