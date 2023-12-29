import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationInputDto {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  sensorId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
