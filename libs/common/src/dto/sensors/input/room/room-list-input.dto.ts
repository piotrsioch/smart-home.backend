import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoomOrderFieldEnum } from '../../../../domain';

export class RoomListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ enum: RoomOrderFieldEnum, required: false })
  @IsString()
  @IsOptional()
  orderField?: RoomOrderFieldEnum;
}
