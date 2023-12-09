import {
  PaginationOptionsInputDto,
  ReedSwitchOrderFieldEnum,
} from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id', 'isOpened'];

export class ReedSwitchListQueryInput extends PaginationOptionsInputDto {
  orderField?: ReedSwitchOrderFieldEnum;
}
