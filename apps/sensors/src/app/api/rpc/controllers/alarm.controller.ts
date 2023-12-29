import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AlarmDto,
  mapEntityToDto,
  PaginationOutput,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import {
  AlarmListInputDto,
  ChangeAlarmStateInputDto,
  GetAlarmStateInputDto,
} from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';
import { ChangeAlarmStateCommand } from '../../../application/sensors/alarm/commands';
import { AlarmListQuery, GetAlarmStateQuery } from '../../../application/sensors/alarm/queries';

@Controller()
export class AlarmController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.CHANGE_ALARM_STATE)
  async changeAlarmState(@Payload() payload: ChangeAlarmStateInputDto): Promise<AlarmDto> {
    const { state, sensorId } = payload;

    const command = new ChangeAlarmStateCommand({
      state,
      sensorId,
    });

    const result = await this.commandBus.execute<ChangeAlarmStateCommand>(command);

    return mapEntityToDto(AlarmDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.GET_ALARM_STATE)
  async getAlarmState(@Payload() payload: GetAlarmStateInputDto): Promise<AlarmDto> {
    const { sensorId } = payload;

    const query = new GetAlarmStateQuery({ sensorId });

    const result = await this.queryBus.execute<GetAlarmStateQuery>(query);

    return mapEntityToDto(AlarmDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.ALARM_LIST)
  async alarmList(@Payload() payload: AlarmListInputDto): Promise<PaginationOutput<AlarmDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new AlarmListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    const result = await this.queryBus.execute<AlarmListQuery>(query);

    return mapEntityToDto(PaginationOutput<AlarmDto>, result);
  }
}
