import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChangeAlarmStateInputDto extends BaseSensorInputDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  desiredState: boolean;
}
