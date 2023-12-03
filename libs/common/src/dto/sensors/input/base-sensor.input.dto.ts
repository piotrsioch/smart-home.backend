import { IsString } from 'class-validator';

export class BaseSensorInputDto {
  @IsString()
  sensorId: string;
}
