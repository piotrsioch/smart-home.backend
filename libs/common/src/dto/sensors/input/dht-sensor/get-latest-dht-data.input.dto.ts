import { IsString } from 'class-validator';

export class GetLatestDhtDataInputDto {
  @IsString()
  sensorId: string;
}
