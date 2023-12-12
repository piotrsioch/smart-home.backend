import { IsString } from 'class-validator';

export class SmokeSensorCriticalValueDetectedEventDto {
  @IsString()
  sensorId: string;
}
