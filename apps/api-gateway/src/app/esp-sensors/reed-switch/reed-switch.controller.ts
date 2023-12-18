import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AddReedSwitchDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  GetLatestReedSwitchDataInputDto,
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
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ADD_REED_SWITCH_DATA,
      data: input,
    });
  }

  @ApiResponse({ status: 200, type: PaginationOutput<ReedSwitchDto> })
  @Get('/list')
  async reedSwitchList(
    @Query() input: ReedSwitchListInputDto,
  ): Promise<PaginationOutput<ReedSwitchDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.REED_SWITCH_LIST,
      data: input,
    });
  }

  @ApiResponse({ status: 200, type: ReedSwitchDto })
  @Get('/latest-data')
  async getLatestData(@Query() input: GetLatestReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_LATEST_REED_SWITCH_DATA,
      data: input,
    });
  }
}
