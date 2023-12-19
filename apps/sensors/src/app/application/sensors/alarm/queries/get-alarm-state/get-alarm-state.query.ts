import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IAlarmRepository, ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';
import { Alarm } from '../../../../../domain';

export type GetAlarmStateQueryInput = {
  sensorId: string;
};

export class GetAlarmStateQuery implements IQuery {
  constructor(public readonly input: GetAlarmStateQueryInput) {}
}

@QueryHandler(GetAlarmStateQuery)
export class GetAlarmStateQueryHandler implements IQueryHandler<GetAlarmStateQuery, Alarm> {
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly alarmRepository: IAlarmRepository,
  ) {}

  async execute(query: GetAlarmStateQuery): Promise<Alarm> {
    const { sensorId } = query.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    return await this.alarmRepository.findLatestData({ sensorId });
  }
}
