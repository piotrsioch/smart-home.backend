import { PirSensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/pir-sensor-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';

export class PirSensorListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: PirSensorOrderFieldEnum;
}
