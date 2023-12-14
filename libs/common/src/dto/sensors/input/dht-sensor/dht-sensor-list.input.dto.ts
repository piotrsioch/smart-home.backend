import { DhtSensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/dht-sensor-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DhtSensorListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: DhtSensorOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: DhtSensorOrderFieldEnum;
}
