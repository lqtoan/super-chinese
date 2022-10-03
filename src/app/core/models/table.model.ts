import { NzTableFilterFn, NzTableSortFn } from 'ng-zorro-antd/table';

export interface TableHeader<RecordType> extends TableHeaderConfiguration<RecordType> {
  position?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';

  // Sort
  sortOrder?: 'ascend' | 'descend' | null;
  sortFn?: NzTableSortFn<RecordType> | boolean;
  sortPriority?: number;

  // Filter
  filters?: Array<{ text: string; value: any; byDefault?: boolean }>;
  filterFn?: NzTableFilterFn<RecordType> | boolean;
}

export interface TableHeaderConfiguration<RecordType> {
  label: string;
  field: keyof RecordType & string;
  width?: string;
}
