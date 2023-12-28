import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoomTypeEnum } from '../../../../domain';

export class EditRoomInputDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ enum: RoomTypeEnum, required: false })
  @IsEnum(RoomTypeEnum)
  @IsOptional()
  roomType?: RoomTypeEnum;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
