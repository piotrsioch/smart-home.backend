import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../../domain';
import { IReedSwitchRepository, ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type GetLatestReedSwitchDataQueryInput = {
  sensorId: string;
};

export class GetLatestReedSwitchDataQuery implements IQuery {
  constructor(public readonly input: GetLatestReedSwitchDataQueryInput) {}
}

@QueryHandler(GetLatestReedSwitchDataQuery)
export class GetLatestReedSwitchDataQueryHandler
  implements IQueryHandler<GetLatestReedSwitchDataQuery, DhtSensor>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly reedSwitchRepository: IReedSwitchRepository,
  ) {}

  async execute(query: GetLatestReedSwitchDataQuery): Promise<DhtSensor> {
    const { sensorId } = query.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    return await this.reedSwitchRepository.findLatestData({
      sensorId,
    });
  }
}
