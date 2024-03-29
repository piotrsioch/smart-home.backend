import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddSmokeSensorDataInputDto,
  GetLatestSmokeDataInputDto,
  mapEntityToDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  SmokeSensorDto,
  SmokeSensorListInputDto,
} from '@smart-home.backend/libs/common';
import { AddSmokeSensorDataCommand, SmokeSensorListQuery } from '../../../application/sensors';
import { GetLatestSmokeDataQuery } from '../../../application/sensors/smoke-sensor/queries/get-latest-data';

@Controller()
export class SmokeSensorController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_SMOKE_DATA)
  async addSmokeData(@Payload() payload: AddSmokeSensorDataInputDto): Promise<SmokeSensorDto> {
    const { sensorId, value } = payload;

    const command = new AddSmokeSensorDataCommand({
      sensorId,
      value,
    });

    const result = await this.commandBus.execute<AddSmokeSensorDataCommand>(command);

    return mapEntityToDto(SmokeSensorDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.SMOKE_SENSOR_LIST)
  async smokeSensorList(
    @Payload() payload: SmokeSensorListInputDto,
  ): Promise<PaginationOutput<SmokeSensorDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new SmokeSensorListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    const result = await this.queryBus.execute<SmokeSensorListQuery>(query);

    return mapEntityToDto(PaginationOutput<SmokeSensorDto>, result);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_LATEST_SMOKE_DATA)
  async getLatestSmokeData(
    @Payload() payload: GetLatestSmokeDataInputDto,
  ): Promise<SmokeSensorDto> {
    const { sensorId } = payload;

    const query = new GetLatestSmokeDataQuery({
      sensorId,
    });

    const result = await this.queryBus.execute<GetLatestSmokeDataQuery>(query);

    return mapEntityToDto(SmokeSensorDto, result);
  }
}
