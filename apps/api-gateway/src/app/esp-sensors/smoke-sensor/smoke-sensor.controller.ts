import { Body, Controller, Get, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  AddSmokeSensorDataInputDto,
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  GetLatestSmokeDataInputDto,
  mapObjectToDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
  SmokeSensorDto,
  SmokeSensorListInputDto,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Smoke sensor')
@UseFilters(CustomExceptionFilter)
@Controller('/smoke-sensor')
export class SmokeSensorController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: SmokeSensorDto })
  @Post('/add-data')
  async addSmokeSensorData(
    @Body(new ValidationPipe({ transform: true })) input: AddSmokeSensorDataInputDto,
  ): Promise<SmokeSensorDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_SMOKE_DATA,
      data: input,
    });

    return mapObjectToDto(SmokeSensorDto, result);
  }

  @ApiOkResponsePaginated(SmokeSensorDto)
  @Get('/list')
  async dhtSensorList(
    @Query() input: SmokeSensorListInputDto,
  ): Promise<PaginationOutput<SmokeSensorDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SMOKE_SENSOR_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<SmokeSensorDto>, result);
  }

  @ApiResponse({ status: 200, type: SmokeSensorDto })
  @Get('/latest-data')
  async getLatestData(@Query() input: GetLatestSmokeDataInputDto): Promise<SmokeSensorDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_LATEST_SMOKE_DATA,
      data: input,
    });

    return mapObjectToDto(SmokeSensorDto, result);
  }
}
