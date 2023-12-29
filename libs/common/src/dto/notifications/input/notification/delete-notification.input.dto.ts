import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNotificationInputDto {
  @ApiProperty()
  @IsString()
  id: string;
}
