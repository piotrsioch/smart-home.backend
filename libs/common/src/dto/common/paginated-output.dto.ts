import { IsArray, IsNumber } from 'class-validator';

export class PaginationOutput<T> {
  @IsArray()
  items: T[];

  @IsNumber()
  total: number;
}
