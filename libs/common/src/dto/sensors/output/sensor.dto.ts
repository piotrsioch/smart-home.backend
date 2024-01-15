import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { SensorTypeEnum } from '../../../domain';
import { ModelDto } from '../../common';

export class SensorDto extends ModelDto {
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
