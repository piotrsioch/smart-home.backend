import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  ChangeLightStateInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  GetLightStateInputDto,
  LightDto,
  LightListInputDto,
  mapObjectToDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Light')
@UseFilters(CustomExceptionFilter)
@Controller('/light')
export class LightController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: LightDto })
  @Post('/change-state')
  async changeLightState(@Body() input: ChangeLightStateInputDto): Promise<LightDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CHANGE_LIGHT_STATE,
      data: input,
    });

    return mapObjectToDto(LightDto, result);
  }

  @ApiOkResponsePaginated(LightDto)
  @Get('/list')
  async lightList(@Query() input: LightListInputDto): Promise<PaginationOutput<LightDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.LIGHT_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<LightDto>, result);
  }

  @ApiResponse({ status: 200, type: LightDto })
  @Get('/get-state')
  async getLightState(@Query() input: GetLightStateInputDto): Promise<LightDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_LIGHT_STATE,
      data: input,
    });

    return mapObjectToDto(LightDto, result);
  }
}
