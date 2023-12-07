import {
  DhtSensorOrderFieldEnum,
  PaginationOptionsInputDto,
} from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id'];

export class DhtSensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: DhtSensorOrderFieldEnum;
}
