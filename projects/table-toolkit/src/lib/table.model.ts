import { FieldInfo } from './field-info';

export interface TableBaseConfig {
  showPaginator?: boolean;
  showActionsColumn?: boolean;
  fields: Array<FieldInfo>;
  showEdit?: boolean;
  showDelete?: boolean;
}

export interface SortModel {
  direction: 'asc' | 'desc' | '';
  field: string;
}

export interface TableBaseFilter {
  page: number;
  pageSize: number;
  count: number;
}
