import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ChangeLightStateInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  GetLightStateInputDto,
  LightDto,
  LightListInputDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/light')
export class LightController {
  constructor(private client: CustomClientProxy) {}

  @Post('/change-state')
  async changeLightState(@Body() input: ChangeLightStateInputDto): Promise<LightDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CHANGE_LIGHT_STATE,
      data: input,
    });
  }

  @Get('/list')
  async lightList(@Query() input: LightListInputDto): Promise<PaginationOutput<LightDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.LIGHT_LIST,
      data: input,
    });
  }

  @Get('/get-state')
  async getLightState(@Query() input: GetLightStateInputDto): Promise<LightDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_LIGHT_STATE,
      data: input,
    });
  }
}
