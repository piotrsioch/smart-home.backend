import { ReedSwitchOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/reed-switch-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';

export class ReedSwitchListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: ReedSwitchOrderFieldEnum;
}
