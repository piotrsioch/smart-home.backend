import {
  PaginationOptionsInputDto,
  ReedSwitchOrderFieldEnum,
} from '@smart-home.backend/libs/common';

export const reedSearchFields = ['sensorId', 'createdAt', '_id', 'isOpened'];

export class ReedSwitchListQueryInput extends PaginationOptionsInputDto {
  orderField?: ReedSwitchOrderFieldEnum;
}
