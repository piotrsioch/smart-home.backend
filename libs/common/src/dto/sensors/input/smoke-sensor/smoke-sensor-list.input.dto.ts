import { SmokeSensorOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/smoke-sensor-order-field.enum';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SmokeSensorListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: SmokeSensorOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: SmokeSensorOrderFieldEnum;
}
