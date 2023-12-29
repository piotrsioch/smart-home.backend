import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddDhtSensorDataInputDto,
  DhtSensorDto,
  DhtSensorListInputDto,
  GetLatestDhtDataInputDto,
  mapEntityToDto,
  PaginationOutput,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  AddDhtSensorDataCommand,
  DhtSensorListQuery,
  GetLatestDhtDataQuery,
} from '../../../application';

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

    const result = await this.commandBus.execute<AddDhtSensorDataCommand>(command);

    return mapEntityToDto(DhtSensorDto, result);
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

    const result = await this.queryBus.execute<DhtSensorListQuery>(query);

    return mapEntityToDto(PaginationOutput<DhtSensorDto>, result);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_LATEST_DHT_DATA)
  async getLatestDhtData(@Payload() payload: GetLatestDhtDataInputDto): Promise<DhtSensorDto> {
    const { sensorId } = payload;

    const query = new GetLatestDhtDataQuery({
      sensorId,
    });

    const result = await this.queryBus.execute<GetLatestDhtDataQuery>(query);

    return mapEntityToDto(DhtSensorDto, result);
  }
}
