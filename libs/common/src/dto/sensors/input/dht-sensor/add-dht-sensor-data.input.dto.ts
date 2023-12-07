import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddDhtSensorDataInputDto extends BaseSensorInputDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  temperature: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  humidity: number;
}
