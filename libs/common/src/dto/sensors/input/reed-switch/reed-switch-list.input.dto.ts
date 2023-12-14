import { ReedSwitchOrderFieldEnum } from '../../../../domain/enums/sensors/order-fields/reed-switch-order-field.enum';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReedSwitchListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: ReedSwitchOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: ReedSwitchOrderFieldEnum;
}
