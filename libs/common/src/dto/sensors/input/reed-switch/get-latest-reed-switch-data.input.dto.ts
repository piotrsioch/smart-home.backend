import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLatestReedSwitchDataInputDto {
  @ApiProperty()
  @IsString()
  sensorId: string;
}
