import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../../domain';
import { IDhtSensorRepository, ISensorRepository } from '../../../contracts';
import { RpcException } from '@nestjs/microservices';

export type GetLatestDhtDataQueryInput = {
  sensorId: string;
};

export class GetLatestDhtDataQuery implements IQuery {
  constructor(public readonly input: GetLatestDhtDataQueryInput) {}
}

@QueryHandler(GetLatestDhtDataQuery)
export class GetLatestDhtDataQueryHandler
  implements IQueryHandler<GetLatestDhtDataQuery, DhtSensor>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly dhtSensorRepository: IDhtSensorRepository,
  ) {}

  async execute(query: GetLatestDhtDataQuery): Promise<DhtSensor> {
    const { sensorId } = query.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new RpcException('Sensor with given id does not exist');
    }

    return await this.dhtSensorRepository.findLatestData({
      sensorId,
    });
  }
}
