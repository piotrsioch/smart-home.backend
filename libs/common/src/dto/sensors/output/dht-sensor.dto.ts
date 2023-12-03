import { IsString } from 'class-validator';
import { BaseSensorDto } from './base-sensor.dto';

export class DhtSensorDto extends BaseSensorDto {
  @IsString()
  temperature: string;

  @IsString()
  humidity: string;
}
