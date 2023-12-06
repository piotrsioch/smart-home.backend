import { SensorTypeEnum } from '../../../domain';
import { IsEnum, IsString } from 'class-validator';

export class CreateSensorInputDto {
  @IsString()
  id: string;

  @IsEnum(SensorTypeEnum)
  n: SensorTypeEnum;

  @IsString()
  name: string;

  @IsString()
  location: string;
}
