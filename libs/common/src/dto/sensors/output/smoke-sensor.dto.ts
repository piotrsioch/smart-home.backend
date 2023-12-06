import { IsNumber } from 'class-validator';
import { BaseSensorDto } from './base-sensor.dto';

export class SmokeSensorDto extends BaseSensorDto {
  @IsNumber()
  value: string;
}
