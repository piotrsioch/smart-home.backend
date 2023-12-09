import {
  PaginationOptionsInputDto,
  PirSensorOrderFieldEnum,
} from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id'];

export class PirSensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: PirSensorOrderFieldEnum;
}
