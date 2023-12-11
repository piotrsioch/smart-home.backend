import { IsString } from 'class-validator';

export class PirSensorMovementDetectedEventDto {
  @IsString()
  sensorId: string;
}
