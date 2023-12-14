import { IsNumber } from 'class-validator';
import { BaseSensorDto } from './base-sensor.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SmokeSensorDto extends BaseSensorDto {
  @ApiProperty()
  @IsNumber()
  value: number;
}
