import { Body, Controller, Get, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  AddSmokeSensorDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
  SmokeSensorDto,
  SmokeSensorListInputDto,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/smoke-sensor')
export class SmokeSensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addSmokeSensorData(
    @Body(new ValidationPipe({ transform: true })) input: AddSmokeSensorDataInputDto,
  ): Promise<SmokeSensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_SMOKE_DATA,
      data: input,
    });
  }

  @Get('/list')
  async dhtSensorList(
    @Body() input: SmokeSensorListInputDto,
  ): Promise<PaginationOutput<SmokeSensorDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SMOKE_SENSOR_LIST,
      data: input,
    });
  }
}
