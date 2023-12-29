import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModelDto } from '../../../dto';

export class NotificationDto extends ModelDto {
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

  @ApiProperty()
  @IsBoolean()
  isRead: boolean;
}
