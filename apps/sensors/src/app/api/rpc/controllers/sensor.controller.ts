import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateSensorInputDto,
  EditSensorInputDto,
  GetSensorByIdInputDto,
  mapEntityToDto,
  PaginationOutput,
  SensorDto,
  SensorListInputDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  CreateSensorCommand,
  EditSensorCommand,
  GetSensorByIdQuery,
  SensorListQuery,
} from '../../../application/sensors/sensor';

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

    const result = await this.commandBus.execute<CreateSensorCommand>(command);

    return mapEntityToDto(SensorDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.EDIT_SENSOR)
  async editSensor(@Payload() payload: EditSensorInputDto): Promise<SensorDto> {
    const { id, type, name, location } = payload;

    const command = new EditSensorCommand({
      id,
      type,
      name,
      location,
    });

    const result = await this.commandBus.execute<EditSensorCommand>(command);

    return mapEntityToDto(SensorDto, result);
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

    const result = await this.queryBus.execute<SensorListQuery>(query);

    return mapEntityToDto(PaginationOutput<SensorDto>, result);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_SENSOR_BY_ID)
  async getSensorById(@Payload() payload: GetSensorByIdInputDto): Promise<SensorDto> {
    const { id } = payload;

    const query = new GetSensorByIdQuery({
      id,
    });

    const result = await this.queryBus.execute<GetSensorByIdQuery>(query);

    return mapEntityToDto(SensorDto, result);
  }
}
