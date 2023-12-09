import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Sensor } from '../../../../domain/models/sensors';
import { ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type GetSensorByIdQueryInput = {
  id: string;
};

export class GetSensorByIdQuery implements IQuery {
  constructor(public readonly input: GetSensorByIdQueryInput) {}
}

@QueryHandler(GetSensorByIdQuery)
export class GetSensorByIdQueryHandler implements IQueryHandler<GetSensorByIdQuery, Sensor> {
  constructor(private readonly sensorRepository: ISensorRepository) {}

  async execute(query: GetSensorByIdQuery): Promise<Sensor> {
    const { id } = query.input;

    const sensor = await this.sensorRepository.findOneById(id);

    if (!sensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    return sensor;
  }
}
