import { SortOrder } from '../../domain/enums';
import { IPaginationOptions } from '../../application/contracts/interfaces';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationOptionsInputDto implements IPaginationOptions {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderField?: string;

  @ApiProperty({ enum: SortOrder, required: false })
  @IsOptional()
  @IsString()
  orderDirection?: SortOrder;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
