import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  CreateSensorInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  EditSensorInputDto,
  GetSensorByIdInputDto,
  mapObjectToDto,
  PaginationOutput,
  ReedSwitchListInputDto,
  SensorDto,
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
  async createSensor(@Body() input: CreateSensorInputDto): Promise<SensorDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CREATE_SENSOR,
      data: input,
    });

    return mapObjectToDto(SensorDto, result);
  }

  @ApiResponse({ status: 200, type: SensorDto })
  @Post('/edit')
  async editSensor(@Body() input: EditSensorInputDto): Promise<SensorDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.EDIT_SENSOR,
      data: input,
    });

    return mapObjectToDto(SensorDto, result);
  }

  @ApiOkResponsePaginated(SensorDto)
  @Get('/list')
  async sensorList(@Query() input: ReedSwitchListInputDto): Promise<PaginationOutput<SensorDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SENSOR_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<SensorDto>, result);
  }

  @ApiResponse({ status: 200, type: SensorDto })
  @Get('/get-by-id')
  async getById(@Query() input: GetSensorByIdInputDto): Promise<SensorDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_SENSOR_BY_ID,
      data: input,
    });

    return mapObjectToDto(SensorDto, result);
  }
}
