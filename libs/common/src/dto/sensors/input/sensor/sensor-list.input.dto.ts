import { SensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/sensor-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SensorListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: SensorOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: SensorOrderFieldEnum;
}
