import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoomTypeEnum } from '@smart-home.backend/libs/common';

export class CreateRoomInputDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: RoomTypeEnum, required: true })
  roomType: RoomTypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
