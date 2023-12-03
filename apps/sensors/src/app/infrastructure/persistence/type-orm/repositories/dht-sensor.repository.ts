import { Injectable } from '@nestjs/common';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';
import { GenericRepository } from '@smart-home.backend/libs/common';
import { IDhtSensorRepository } from '../../../../application';
import { DhtSensor } from '../../../../domain/models';

@Injectable()
export class DhtSensorRepository
  extends GenericRepository<DhtSensor>
  implements IDhtSensorRepository
{
  _marker: true;
}
