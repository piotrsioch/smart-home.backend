import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Light } from '../../../../domain';
import { ILightRepository, ISensorRepository } from '../../../contracts';
import { RpcException } from '@nestjs/microservices';

export type GetLightStateQueryInput = {
  sensorId: string;
};

export class GetLightStateQuery implements IQuery {
  constructor(public readonly input: GetLightStateQueryInput) {}
}

@QueryHandler(GetLightStateQuery)
export class GetLightStateQueryHandler implements IQueryHandler<GetLightStateQuery, Light> {
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly lightRepository: ILightRepository,
  ) {}

  async execute(query: GetLightStateQuery): Promise<Light> {
    const { sensorId } = query.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new RpcException('Sensor with given id does not exist');
    }

    return await this.lightRepository.findLatestData({ sensorId });
  }
}
