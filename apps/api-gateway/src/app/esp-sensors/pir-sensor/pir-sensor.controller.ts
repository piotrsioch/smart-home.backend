import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AddPirSensorDataInputDto,
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  mapObjectToDto,
  PaginationOutput,
  PirSensorDto,
  PirSensorListInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pir sensor')
@UseFilters(CustomExceptionFilter)
@Controller('/pir-sensor')
export class PirSensorController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: PirSensorDto })
  @Post('/add-data')
  async addPirSensorData(@Body() input: AddPirSensorDataInputDto): Promise<PirSensorDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_PIR_DATA,
      data: input,
    });

    return mapObjectToDto(PirSensorDto, result);
  }

  @ApiOkResponsePaginated(PirSensorDto)
  @Get('/list')
  async pirSensorList(
    @Query() input: PirSensorListInputDto,
  ): Promise<PaginationOutput<PirSensorDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.PIR_SENSOR_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<PirSensorDto>, result);
  }
}
