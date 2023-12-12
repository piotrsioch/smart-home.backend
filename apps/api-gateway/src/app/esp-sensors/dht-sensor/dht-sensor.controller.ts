import { Body, Controller, Get, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  AddDhtSensorDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  DhtSensorDto,
  DhtSensorListInputDto,
  GetLatestDhtDataInputDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/dht-sensor')
export class DhtSensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addDhtSensorData(
    @Body(new ValidationPipe({ transform: true })) input: AddDhtSensorDataInputDto,
  ): Promise<DhtSensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_DHT_DATA,
      data: input,
    });
  }

  @Get('/list')
  async dhtSensorList(
    @Query() input: DhtSensorListInputDto,
  ): Promise<PaginationOutput<DhtSensorDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.DHT_SENSOR_LIST,
      data: input,
    });
  }

  @Get('/latest-data')
  async getLatestData(@Query() input: GetLatestDhtDataInputDto): Promise<DhtSensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_LATEST_DHT_DATA,
      data: input,
    });
  }
}
