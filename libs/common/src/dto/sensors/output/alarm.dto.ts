import { BaseSensorDto } from './base-sensor.dto';
import { IsEnum } from 'class-validator';
import { AlarmStateEnum } from '../../../domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class AlarmDto extends BaseSensorDto {
  @ApiProperty({ enum: AlarmStateEnum })
  @IsEnum(AlarmStateEnum)
  state: AlarmStateEnum;
}
