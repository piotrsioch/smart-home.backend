import { BaseSensorDto } from './base-sensor.dto';
import { IsBoolean } from 'class-validator';

export class LightDto extends BaseSensorDto {
  @IsBoolean()
  isOn: boolean;
}
