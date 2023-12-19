import { AlarmOrderFieldEnum, PaginationOptionsInputDto } from '@smart-home.backend/libs/common';

export const alarmSearchField = ['sensorId', 'createdAt', '_id'];

export class AlarmListQueryInput extends PaginationOptionsInputDto {
  orderField?: AlarmOrderFieldEnum;
}
