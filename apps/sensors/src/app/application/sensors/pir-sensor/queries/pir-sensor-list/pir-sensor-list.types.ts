import {
  PaginationOptionsInputDto,
  PirSensorOrderFieldEnum,
} from '@smart-home.backend/libs/common';

export const pirSearchFields = ['sensorId', 'createdAt', '_id'];

export class PirSensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: PirSensorOrderFieldEnum;
}
