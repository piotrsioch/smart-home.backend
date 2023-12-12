import { IsString } from 'class-validator';

export class GetNotificationByIdInputDto {
  @IsString()
  id: string;
}
