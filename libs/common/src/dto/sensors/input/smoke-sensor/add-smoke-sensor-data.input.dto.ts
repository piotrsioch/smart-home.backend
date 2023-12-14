import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddSmokeSensorDataInputDto extends BaseSensorInputDto {
  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  value: number;
}
