import { LightOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/light-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';

export class LightListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: LightOrderFieldEnum;
}
