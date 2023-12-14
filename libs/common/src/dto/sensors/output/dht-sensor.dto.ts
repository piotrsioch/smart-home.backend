import { IsNumber } from 'class-validator';
import { BaseSensorDto } from './base-sensor.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DhtSensorDto extends BaseSensorDto {
  @ApiProperty()
  @IsNumber()
  temperature: number;

  @ApiProperty()
  @IsNumber()
  humidity: number;
}
