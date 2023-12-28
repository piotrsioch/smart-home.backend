import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { SensorTypeEnum } from '../../../domain';

export class SensorDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty({ enum: SensorTypeEnum })
  @IsEnum(SensorTypeEnum)
  type: SensorTypeEnum;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  roomId: string;
}
