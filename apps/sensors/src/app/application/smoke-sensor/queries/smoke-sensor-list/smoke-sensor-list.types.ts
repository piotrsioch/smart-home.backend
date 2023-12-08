import {
  PaginationOptionsInputDto,
  SmokeSensorOrderFieldEnum,
} from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id'];

export class SmokeSensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: SmokeSensorOrderFieldEnum;
}
