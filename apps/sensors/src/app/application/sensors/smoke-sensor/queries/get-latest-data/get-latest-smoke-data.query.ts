import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SmokeSensor } from '../../../../../domain';
import { ISensorRepository, ISmokeSensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type GetLatestSmokeDataQueryInput = {
  sensorId: string;
};

export class GetLatestSmokeDataQuery implements IQuery {
  constructor(public readonly input: GetLatestSmokeDataQueryInput) {}
}

@QueryHandler(GetLatestSmokeDataQuery)
export class GetLatestSmokeDataQueryHandler
  implements IQueryHandler<GetLatestSmokeDataQuery, SmokeSensor>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly smokeSensorRepository: ISmokeSensorRepository,
  ) {}

  async execute(query: GetLatestSmokeDataQuery): Promise<SmokeSensor> {
    const { sensorId } = query.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    return await this.smokeSensorRepository.findLatestData({
      sensorId,
    });
  }
}
