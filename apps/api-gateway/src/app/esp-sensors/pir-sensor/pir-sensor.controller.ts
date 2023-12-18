import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AddPirSensorDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  PaginationOutput,
  PirSensorDto,
  PirSensorListInputDto,
  ReedSwitchDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@smart-home.backend/libs/common/src/api/decorators/api-ok-response-paginated';

@ApiTags('Pir sensor')
@UseFilters(CustomExceptionFilter)
@Controller('/pir-sensor')
export class PirSensorController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: PirSensorDto })
  @Post('/add-data')
  async addPirSensorData(@Body() input: AddPirSensorDataInputDto): Promise<PirSensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_PIR_DATA,
      data: input,
    });
  }

  @ApiOkResponsePaginated(PirSensorDto)
  @Get('/list')
  async pirSensorList(
    @Query() input: PirSensorListInputDto,
  ): Promise<PaginationOutput<PirSensorDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.PIR_SENSOR_LIST,
      data: input,
    });
  }
}
