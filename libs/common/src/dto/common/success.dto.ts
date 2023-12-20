import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SuccessDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
