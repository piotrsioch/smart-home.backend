import { SortOrder } from '../../../domain/enums';

export interface IPaginationOptions {
  page: number;
  limit: number;
  orderField?: string;
  orderDirection?: SortOrder;
  search?: string;
  searchFields?: string[];
}
