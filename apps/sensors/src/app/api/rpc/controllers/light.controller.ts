import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ChangeLightStateInputDto,
  GetLightStateInputDto,
  LightDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { ChangeLightStateCommand, GetLightStateQuery } from '../../../application/light';

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
}
