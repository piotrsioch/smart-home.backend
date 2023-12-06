import { Body, Controller, Post } from '@nestjs/common';
import {
  AddReedSwitchDataInputDto,
  CustomClientProxy,
  ReedSwitchDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

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
}
