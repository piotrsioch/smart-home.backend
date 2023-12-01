import { BaseModel } from '@smart-home.backend/libs/common';

export class DhtSensorModel extends BaseModel {
    temperature: string;
    humidity: string;
}
