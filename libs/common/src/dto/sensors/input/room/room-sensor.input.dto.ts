import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoomSensorInputDto {
  @IsString()
  @ApiProperty()
  sensorId: string;

  @IsString()
  @ApiProperty()
  roomId: string;
}
