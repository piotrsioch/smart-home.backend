import { BaseSensorDto } from './base-sensor.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReedSwitchDto extends BaseSensorDto {
  @ApiProperty()
  @IsBoolean()
  isOpened: boolean;
}
