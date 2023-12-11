import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { AlarmOrderFieldEnum } from '@smart-home.backend/libs/common';

export class AlarmListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: AlarmOrderFieldEnum;
}
