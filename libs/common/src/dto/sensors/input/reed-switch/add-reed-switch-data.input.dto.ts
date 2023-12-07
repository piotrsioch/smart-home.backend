import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddReedSwitchDataInputDto extends BaseSensorInputDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isOpened: boolean;
}
