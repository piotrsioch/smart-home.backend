import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationByIdInputDto {
  @ApiProperty()
  @IsString()
  id: string;
}
