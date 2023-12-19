import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { RoomTypeEnum } from '../../../domain';
import { ModelDto } from '../../common';

export class RoomDto extends ModelDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: RoomTypeEnum, required: true })
  roomType: RoomTypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsArray()
  sensorsIds: string;
}
