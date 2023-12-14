import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddReedSwitchDataInputDto extends BaseSensorInputDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isOpened: boolean;
}
