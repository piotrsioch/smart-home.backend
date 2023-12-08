import { SmokeSensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/smoke-sensor-order-field.enum';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { IsOptional, IsString } from 'class-validator';

export class SmokeSensorListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: SmokeSensorOrderFieldEnum;
}
