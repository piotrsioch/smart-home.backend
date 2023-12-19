import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationOutput<T> {
  @IsArray()
  items: T[];

  @ApiProperty()
  @IsNumber()
  total: number;
}
