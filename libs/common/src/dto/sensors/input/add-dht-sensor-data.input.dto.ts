import { BaseSensorInputDto } from './base-sensor.input.dto';
import { IsString } from 'class-validator';

export class AddDhtSensorDataInputDto extends BaseSensorInputDto {
  @IsString()
  temperature: string;

  @IsString()
  humidity: string;
}
