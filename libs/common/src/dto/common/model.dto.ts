import { IsDate, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class ModelDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;
}
