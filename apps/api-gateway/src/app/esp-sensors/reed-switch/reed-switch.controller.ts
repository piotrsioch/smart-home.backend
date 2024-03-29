import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AddReedSwitchDataInputDto,
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  GetLatestReedSwitchDataInputDto,
  mapObjectToDto,
  PaginationOutput,
  ReedSwitchDto,
  ReedSwitchListInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reed switch')
@UseFilters(CustomExceptionFilter)
@Controller('/reed-switch')
export class ReedSwitchController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: ReedSwitchDto })
  @Post('/add-data')
  async addReedSwitchController(@Body() input: AddReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_REED_SWITCH_DATA,
      data: input,
    });

    return mapObjectToDto(ReedSwitchDto, result);
  }

  @ApiOkResponsePaginated(ReedSwitchDto)
  @Get('/list')
  async reedSwitchList(
    @Query() input: ReedSwitchListInputDto,
  ): Promise<PaginationOutput<ReedSwitchDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.REED_SWITCH_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<ReedSwitchDto>, result);
  }

  @ApiResponse({ status: 200, type: ReedSwitchDto })
  @Get('/latest-data')
  async getLatestData(@Query() input: GetLatestReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_LATEST_REED_SWITCH_DATA,
      data: input,
    });

    return mapObjectToDto(ReedSwitchDto, result);
  }
}
