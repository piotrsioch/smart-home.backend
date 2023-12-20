import { PaginationOptionsInputDto, RoomOrderFieldEnum } from '@smart-home.backend/libs/common';

export const roomSearchField = ['sensorId', 'createdAt', '_id'];

export class RoomListQueryInput extends PaginationOptionsInputDto {
  orderField?: RoomOrderFieldEnum;
}
