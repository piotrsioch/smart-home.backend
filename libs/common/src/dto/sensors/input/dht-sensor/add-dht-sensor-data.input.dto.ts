import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddDhtSensorDataInputDto extends BaseSensorInputDto {
  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  temperature: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  humidity: number;
}
