import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSensorByIdInputDto {
  @IsString()
  @ApiProperty()
  id: string;
}
