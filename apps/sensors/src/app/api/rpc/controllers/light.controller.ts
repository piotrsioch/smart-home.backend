import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ChangeLightStateInputDto,
  GetLightStateInputDto,
  LightDto,
  LightListInputDto,
  PaginationOutput,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  ChangeLightStateCommand,
  GetLightStateQuery,
  LightListQuery,
} from '../../../application/light';

@Controller()
export class LightController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.CHANGE_LIGHT_STATE)
  async changeLightState(@Payload() payload: ChangeLightStateInputDto): Promise<LightDto> {
    const { sensorId } = payload;

    const command = new ChangeLightStateCommand({ sensorId });

    return await this.commandBus.execute<ChangeLightStateCommand>(command);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_LIGHT_STATE)
  async getLightState(@Payload() payload: GetLightStateInputDto): Promise<LightDto> {
    const { sensorId } = payload;

    const query = new GetLightStateQuery({ sensorId });

    return await this.queryBus.execute<GetLightStateQuery>(query);
  }

  @MessagePattern(SensorsCommunicationEnum.LIGHT_LIST)
  async lightList(@Payload() payload: LightListInputDto): Promise<PaginationOutput<LightDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new LightListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    return await this.queryBus.execute<LightListQuery>(query);
  }
}
