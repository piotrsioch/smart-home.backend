import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsEnum } from 'class-validator';
import { AlarmStateEnum } from '../../../../domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeAlarmStateInputDto extends BaseSensorInputDto {
  @ApiProperty({ enum: AlarmStateEnum })
  @IsEnum(AlarmStateEnum)
  state: AlarmStateEnum;
}
