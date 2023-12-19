import { PaginationOptionsInputDto, SensorOrderFieldEnum } from '@smart-home.backend/libs/common';

export const sensorSearchFields = ['createdAt', '_id', 'type', 'location', 'name'];

export class SensorListQueryInput extends PaginationOptionsInputDto {
  orderField?: SensorOrderFieldEnum;
}
