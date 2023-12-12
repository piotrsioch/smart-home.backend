import { IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  name: string;

  @IsString()
  message: string;

  @IsString()
  receiver: string;

  @IsString()
  sensorId: string;
}
