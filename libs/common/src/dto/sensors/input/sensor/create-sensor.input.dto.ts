import { SensorTypeEnum } from '../../../../domain';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorInputDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ enum: SensorTypeEnum })
  @IsEnum(SensorTypeEnum)
  type: SensorTypeEnum;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;
}
