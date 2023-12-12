import { BaseSensorDto } from './base-sensor.dto';
import { IsEnum } from 'class-validator';
import { AlarmStateEnum } from '../../../domain/enums';

export class AlarmDto extends BaseSensorDto {
  @IsEnum(AlarmStateEnum)
  state: AlarmStateEnum;
}
