import { ModelDto } from '../../common';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseSensorDto extends ModelDto {
  @ApiProperty()
  @IsString()
  sensorId: string;
}
