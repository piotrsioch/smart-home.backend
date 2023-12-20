import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdInputDto {
  @ApiProperty()
  @IsString()
  id: string;
}
