import { LightOrderFieldEnum, PaginationOptionsInputDto } from '@smart-home.backend/libs/common';

export const lightSearchFields = ['sensorId', 'createdAt', '_id'];

export class LightListQueryInput extends PaginationOptionsInputDto {
  orderField?: LightOrderFieldEnum;
}
