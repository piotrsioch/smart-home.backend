import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoomTypeEnum } from '../../../../domain';

export class CreateRoomInputDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: RoomTypeEnum, required: true })
  @IsEnum(RoomTypeEnum)
  roomType: RoomTypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
