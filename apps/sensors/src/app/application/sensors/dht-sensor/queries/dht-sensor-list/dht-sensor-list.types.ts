import {
  DhtSensorOrderFieldEnum,
  PaginationOptionsInputDto,
} from '@smart-home.backend/libs/common';

export const dhtSearchFields = ['sensorId', 'createdAt', '_id'];

export class DhtSensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: DhtSensorOrderFieldEnum;
}
