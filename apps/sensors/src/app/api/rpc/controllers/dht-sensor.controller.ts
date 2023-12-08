import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddDhtSensorDataInputDto,
  DhtSensorDto,
  DhtSensorListInputDto,
  GetLatestDhtDataInputDto,
  PaginationOutput,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  AddDhtSensorDataCommand,
  DhtSensorListQuery,
  GetLatestDhtDataQuery,
} from '../../../application';
import { CustomRpcExceptionFilter } from '@smart-home.backend/libs/common/src/api/filters/test';

@UseFilters(CustomRpcExceptionFilter)
@Controller()
export class DhtSensorController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_DHT_DATA)
  async addDhtData(@Payload() payload: AddDhtSensorDataInputDto): Promise<DhtSensorDto> {
    const { temperature, sensorId, humidity } = payload;

    const command = new AddDhtSensorDataCommand({
      temperature,
      sensorId,
      humidity,
    });

    return await this.commandBus.execute<AddDhtSensorDataCommand>(command);
  }

  @MessagePattern(SensorsCommunicationEnum.DHT_SENSOR_LIST)
  async dhtSensorList(
    @Payload() payload: DhtSensorListInputDto,
  ): Promise<PaginationOutput<DhtSensorDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new DhtSensorListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    return await this.queryBus.execute<DhtSensorListQuery>(query);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_LATEST_DHT_DATA)
  async getLatestDhtData(@Payload() payload: GetLatestDhtDataInputDto): Promise<DhtSensorDto> {
    const { sensorId } = payload;

    const query = new GetLatestDhtDataQuery({
      sensorId,
    });

    return await this.queryBus.execute<GetLatestDhtDataQuery>(query);
  }
}
