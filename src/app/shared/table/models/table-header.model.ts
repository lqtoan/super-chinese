import { NzTableFilterFn, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface TableHeader<RecordType> {
  label: string;
  field: keyof RecordType & string;
  cellType?: string;
  width?: string;
  position?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';

  // Sort
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn<RecordType> | boolean;
  sortPriority?: number | boolean;

  // Filter
  filters?: Array<{ text: string; value: any; byDefault?: boolean }>;
  filterFn?: NzTableFilterFn<RecordType> | boolean;
}
