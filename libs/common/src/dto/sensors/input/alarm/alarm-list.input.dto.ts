import { IsEnum, IsOptional } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { AlarmOrderFieldEnum } from '@smart-home.backend/libs/common';
import { ApiProperty } from '@nestjs/swagger';

export class AlarmListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: AlarmOrderFieldEnum, required: false })
  @IsEnum(AlarmOrderFieldEnum)
  @IsOptional()
  orderField?: AlarmOrderFieldEnum;
}
