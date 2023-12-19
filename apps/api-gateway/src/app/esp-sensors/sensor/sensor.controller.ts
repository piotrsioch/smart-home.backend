import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  GetSensorByIdInputDto,
  PaginationOutput,
  ReedSwitchListInputDto,
  SensorDto,
  SensorListInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sensors')
@UseFilters(CustomExceptionFilter)
@Controller('/sensors')
export class SensorController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: SensorDto })
  @Post('/create')
  async createSensor(@Body() input: SensorListInputDto): Promise<SensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SENSOR_LIST,
      data: input,
    });
  }

  @ApiOkResponsePaginated(SensorDto)
  @Get('/list')
  async sensorList(@Query() input: ReedSwitchListInputDto): Promise<PaginationOutput<SensorDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SENSOR_LIST,
      data: input,
    });
  }

  @ApiResponse({ status: 200, type: SensorDto })
  @Get('/get-by-id')
  async getById(@Body() input: GetSensorByIdInputDto): Promise<SensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_SENSOR_BY_ID,
      data: input,
    });
  }
}
