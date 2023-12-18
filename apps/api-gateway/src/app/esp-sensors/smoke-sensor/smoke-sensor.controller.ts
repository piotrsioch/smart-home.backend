import { Body, Controller, Get, Post, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  AddSmokeSensorDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  LightDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
  SmokeSensorDto,
  SmokeSensorListInputDto,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@smart-home.backend/libs/common/src/api/decorators/api-ok-response-paginated';

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
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_SMOKE_DATA,
      data: input,
    });
  }

  @ApiOkResponsePaginated(SmokeSensorDto)
  @Get('/list')
  async dhtSensorList(
    @Query() input: SmokeSensorListInputDto,
  ): Promise<PaginationOutput<SmokeSensorDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SMOKE_SENSOR_LIST,
      data: input,
    });
  }
}
