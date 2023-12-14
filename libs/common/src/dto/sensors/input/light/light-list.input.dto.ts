import { LightOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/light-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LightListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: LightOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: LightOrderFieldEnum;
}
