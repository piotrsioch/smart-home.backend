import { BaseModel } from '@smart-home.backend/libs/common';

export class DhtSensor extends BaseModel {
  temperature: string;
  humidity: string;
}
