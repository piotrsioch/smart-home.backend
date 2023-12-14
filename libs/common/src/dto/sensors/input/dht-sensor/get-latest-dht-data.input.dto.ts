import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLatestDhtDataInputDto {
  @ApiProperty()
  @IsString()
  sensorId: string;
}
