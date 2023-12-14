import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationOutput<T> {
  @ApiProperty()
  @IsArray()
  items: T[];

  @ApiProperty()
  @IsNumber()
  total: number;
}
