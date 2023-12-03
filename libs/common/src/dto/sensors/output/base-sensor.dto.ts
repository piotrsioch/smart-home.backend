import { ModelDto } from '../../common';
import { IsString } from 'class-validator';

export class BaseSensorDto extends ModelDto {
  @IsString()
  sensorId: string;
}
