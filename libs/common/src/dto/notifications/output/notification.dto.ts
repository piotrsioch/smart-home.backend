import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  receiver: string;

  @ApiProperty()
  @IsString()
  sensorId: string;
}
