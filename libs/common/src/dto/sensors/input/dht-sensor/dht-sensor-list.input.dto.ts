import { DhtSensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/dht-sensor-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';

export class DhtSensorListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: DhtSensorOrderFieldEnum;
}
