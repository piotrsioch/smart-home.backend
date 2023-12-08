import { SensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/sensor-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';

export class SensorListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: SensorOrderFieldEnum;
}
