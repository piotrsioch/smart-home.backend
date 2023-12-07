import { PaginationOptionsInputDto } from '@smart-home.backend/libs/common';

export enum DhtSensorOrderFieldEnum {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  SENSOR_ID = 'sensorId',
  CREATED_AT = 'createdAt',
}

export const searchFields = ['sensorId', 'createdAt', '_id'];

export class DhtSensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: DhtSensorOrderFieldEnum;
}
