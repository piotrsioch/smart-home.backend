import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
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

@UseFilters(CustomExceptionFilter)
@Controller('/reed-switch')
export class ReedSwitchController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addReedSwitchController(@Body() input: AddReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.ADD_REED_SWITCH_DATA,
      data: input,
    });
  }

  @Get('/list')
  async reedSwitchList(
    @Body() input: ReedSwitchListInputDto,
  ): Promise<PaginationOutput<ReedSwitchDto>> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.REED_SWITCH_LIST,
      data: input,
    });
  }

  @Get('/latest-data')
  async getLatestData(@Body() input: GetLatestReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.GET_LATEST_REED_SWITCH_DATA,
      data: input,
    });
  }
}
