import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import {
  ChangeLightStateInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  GetLightStateInputDto,
  LightDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/light')
export class LightController {
  constructor(private client: CustomClientProxy) {}

  @Post('/change-state')
  async changeLightState(@Body() input: ChangeLightStateInputDto): Promise<LightDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.CHANGE_LIGHT_STATE,
      data: input,
    });
  }

  @Get('/get-state')
  async getLightState(@Body() input: GetLightStateInputDto): Promise<LightDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.GET_LIGHT_STATE,
      data: input,
    });
  }
}
