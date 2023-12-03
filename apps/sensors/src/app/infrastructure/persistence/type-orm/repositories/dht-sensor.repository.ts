import { Injectable } from '@nestjs/common';
import { IDhtSensorRepository } from '../../../../application';
import { DhtSensor } from '../../../../domain/models';
import { DhtSensorEntity } from "../entities/dht-sensor.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DhtSensorRepository implements IDhtSensorRepository {
  constructor(
    @InjectRepository(DhtSensorEntity)
    private readonly _repository: Repository<DhtSensorEntity>) {
  }

  async save(sensor: DhtSensor): Promise<DhtSensor> {
    return await this._repository.save(sensor);
  }
}
