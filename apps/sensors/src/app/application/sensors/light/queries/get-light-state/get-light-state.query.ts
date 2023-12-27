import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Light } from '../../../../../domain';
import { ILightRepository, ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

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
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    let light = await this.lightRepository.findLatestData({ sensorId });

    if (!light) {
      light = Light.create({
        sensorId,
        isOn: false,
      });

      await this.lightRepository.add(light);
    }

    return light;
  }
}
