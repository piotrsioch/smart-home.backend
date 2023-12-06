import { BaseSensorDto } from './base-sensor.dto';
import { IsBoolean } from 'class-validator';

export class ReedSwitchDto extends BaseSensorDto {
  @IsBoolean()
  isOpened: boolean;
}
