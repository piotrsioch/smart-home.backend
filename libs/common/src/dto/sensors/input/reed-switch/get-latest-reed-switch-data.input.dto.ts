import { IsString } from 'class-validator';

export class GetLatestReedSwitchDataInputDto {
  @IsString()
  sensorId: string;
}
