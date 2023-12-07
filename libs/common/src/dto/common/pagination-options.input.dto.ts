import { SortOrder } from '../../domain/enums';
import { IPaginationOptions } from '../../domain/interfaces';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationOptionsInputDto implements IPaginationOptions {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  orderField?: string;

  @IsOptional()
  @IsString()
  orderDirection?: SortOrder;

  @IsOptional()
  @IsString()
  search?: string;
}
