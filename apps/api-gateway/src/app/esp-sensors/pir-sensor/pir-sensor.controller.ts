import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import {
  AddPirSensorDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  PaginationOutput,
  PirSensorDto,
  PirSensorListInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/pir-sensor')
export class PirSensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addPirSensorData(@Body() input: AddPirSensorDataInputDto): Promise<PirSensorDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.ADD_PIR_DATA,
      data: input,
    });
  }

  @Get('/list')
  async pirSensorList(
    @Body() input: PirSensorListInputDto,
  ): Promise<PaginationOutput<PirSensorDto>> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.PIR_SENSOR_LIST,
      data: input,
    });
  }
}
