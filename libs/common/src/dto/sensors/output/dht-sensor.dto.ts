import { IsNumber } from 'class-validator';
import { BaseSensorDto } from './base-sensor.dto';

export class DhtSensorDto extends BaseSensorDto {
  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;
}
