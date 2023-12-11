import { BaseSensorDto } from './base-sensor.dto';
import { IsBoolean } from 'class-validator';

export class AlarmDto extends BaseSensorDto {
  @IsBoolean()
  isActive: boolean;
}
