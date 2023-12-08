import { LightOrderFieldEnum, PaginationOptionsInputDto } from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id'];

export class LightListQueryInput extends PaginationOptionsInputDto {
  orderField?: LightOrderFieldEnum;
}
