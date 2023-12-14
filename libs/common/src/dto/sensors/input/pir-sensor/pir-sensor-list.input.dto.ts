import { PirSensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/pir-sensor-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PirSensorListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: PirSensorOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: PirSensorOrderFieldEnum;
}
