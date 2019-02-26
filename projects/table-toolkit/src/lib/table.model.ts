import { FieldInfo } from './field-info';

export interface TableBaseConfig {
  showPaginator?: boolean;
  showActionsColumn?: boolean;
  fields: Array<FieldInfo>;
  showEdit?: boolean;
  showDelete?: boolean;
  showAdd?: boolean;
}

export interface SortModel {
  direction: 'asc' | 'desc' | '';
  field: string;
}

export interface TableBaseFilter {
  page: number;
  pageSize: number;
  count?: number;
  filterItems?: Array<FilterItem>;
}

export interface TableBaseResponse {
  page: number;
  pageSize: number;
  count: number;
  items: Array<any>;
}

export interface FilterItem {
  propertyName: string;
  value: any;
}

export interface ValueWithOperator {
  value: any;
  operator: string;
}
