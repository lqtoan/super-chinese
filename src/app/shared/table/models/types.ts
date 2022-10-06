import {
  NzTableComponent,
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

export type Table<RecordType> = NzTableComponent<RecordType>;
export type SortOrder = NzTableSortOrder;
export type SortFn<RecordType> = NzTableSortFn<RecordType>;
export type Filters = NzTableFilterList;
export type FilterFn<RecordType> = NzTableFilterFn<RecordType>;
