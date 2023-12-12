import { BaseSensorInputDto } from '../base-sensor.input.dto';
import { IsEnum } from 'class-validator';
import { AlarmStateEnum } from '../../../../domain/enums';

export class ChangeAlarmStateInputDto extends BaseSensorInputDto {
  @IsEnum(AlarmStateEnum)
  state: AlarmStateEnum;
}
