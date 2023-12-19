import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddReedSwitchDataInputDto,
  GetLatestReedSwitchDataInputDto,
  PaginationOutput,
  ReedSwitchDto,
  ReedSwitchListInputDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { AddReedSwitchDataCommand } from '../../../application/sensors/reed-switch/commands/add-reed-switch-data';
import {
  GetLatestReedSwitchDataQuery,
  ReedSwitchListQuery,
} from '../../../application/sensors/reed-switch/queries';

@Controller()
export class ReedSwitchController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_REED_SWITCH_DATA)
  async addReedSwitchData(@Payload() payload: AddReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    const { sensorId, isOpened } = payload;

    const command = new AddReedSwitchDataCommand({
      sensorId,
      isOpened,
    });

    return await this.commandBus.execute<AddReedSwitchDataCommand>(command);
  }

  @MessagePattern(SensorsCommunicationEnum.REED_SWITCH_LIST)
  async reedSwitchList(
    @Payload() payload: ReedSwitchListInputDto,
  ): Promise<PaginationOutput<ReedSwitchDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new ReedSwitchListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    return await this.queryBus.execute<ReedSwitchListQuery>(query);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_LATEST_REED_SWITCH_DATA)
  async getLatestReedSwitchData(
    @Payload() payload: GetLatestReedSwitchDataInputDto,
  ): Promise<ReedSwitchDto> {
    const { sensorId } = payload;

    const query = new GetLatestReedSwitchDataQuery({
      sensorId,
    });

    return await this.queryBus.execute<GetLatestReedSwitchDataQuery>(query);
  }
}
