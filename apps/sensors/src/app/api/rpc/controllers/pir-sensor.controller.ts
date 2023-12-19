import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddPirSensorDataInputDto,
  PaginationOutput,
  PirSensorDto,
  PirSensorListInputDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  AddPirSensorDataCommand,
  PirSensorListQuery,
} from '../../../application/sensors/pir-sensor';

@Controller()
export class PirSensorController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_PIR_DATA)
  async addPirData(@Payload() payload: AddPirSensorDataInputDto): Promise<PirSensorDto> {
    const { sensorId } = payload;

    const command = new AddPirSensorDataCommand({
      sensorId,
    });

    return await this.commandBus.execute<AddPirSensorDataCommand>(command);
  }

  @MessagePattern(SensorsCommunicationEnum.PIR_SENSOR_LIST)
  async pirSensorList(
    @Payload() payload: PirSensorListInputDto,
  ): Promise<PaginationOutput<PirSensorDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new PirSensorListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    return await this.queryBus.execute<PirSensorListQuery>(query);
  }
}
