import { BaseSensorDto } from './base-sensor.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LightDto extends BaseSensorDto {
  @ApiProperty()
  @IsBoolean()
  isOn: boolean;
}
