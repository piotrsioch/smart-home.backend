import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseSensorInputDto {
  @ApiProperty()
  @IsString()
  sensorId: string;
}
