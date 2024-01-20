import { IsDate, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ModelDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  _id: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  updatedAt: Date;
}
