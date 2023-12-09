import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateSensorInputDto,
  GetSensorByIdInputDto,
  PaginationOutput,
  SensorDto,
  SensorListInputDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  CreateSensorCommand,
  GetSensorByIdQuery,
  SensorListQuery,
} from '../../../application/sensor';

@Controller()
export class SensorController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.CREATE_SENSOR)
  async createSensor(@Payload() payload: CreateSensorInputDto): Promise<SensorDto> {
    const { id, type, name, location } = payload;

    const command = new CreateSensorCommand({
      id,
      type,
      name,
      location,
    });

    return await this.commandBus.execute<CreateSensorCommand>(command);
  }

  @MessagePattern(SensorsCommunicationEnum.SENSOR_LIST)
  async sensorList(@Payload() payload: SensorListInputDto): Promise<PaginationOutput<SensorDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new SensorListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    return await this.queryBus.execute<SensorListQuery>(query);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_SENSOR_BY_ID)
  async getSensorById(@Payload() payload: GetSensorByIdInputDto): Promise<SensorDto> {
    const { id } = payload;

    const query = new GetSensorByIdQuery({
      id,
    });

    return await this.queryBus.execute<GetSensorByIdQuery>(query);
  }
}
