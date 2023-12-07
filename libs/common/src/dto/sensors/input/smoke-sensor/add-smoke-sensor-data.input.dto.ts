import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddSmokeSensorDataInputDto extends BaseSensorInputDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  value: number;
}
