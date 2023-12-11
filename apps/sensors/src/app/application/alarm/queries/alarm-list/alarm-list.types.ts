import { AlarmOrderFieldEnum, PaginationOptionsInputDto } from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id'];

export class AlarmListQueryInput extends PaginationOptionsInputDto {
  orderField?: AlarmOrderFieldEnum;
}
