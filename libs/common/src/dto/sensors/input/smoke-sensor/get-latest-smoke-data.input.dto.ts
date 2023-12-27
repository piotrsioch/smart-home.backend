import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLatestSmokeDataInputDto {
  @ApiProperty()
  @IsString()
  sensorId: string;
}
