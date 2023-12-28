import { SensorTypeEnum } from '../../../../domain';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditSensorInputDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ enum: SensorTypeEnum, required: false })
  @IsEnum(SensorTypeEnum)
  @IsOptional()
  type?: SensorTypeEnum;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location?: string;
}
