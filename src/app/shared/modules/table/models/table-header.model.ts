import { SortFn, SortOrder, FilterFn, Filters } from './types';

export interface TableHeader<RecordType> {
  label: string;
  field: keyof RecordType & string;
  cellType?: string;
  width?: string;
  position?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';

  // Sort
  sortOrder?: SortOrder;
  sortFn?: SortFn<RecordType> | boolean;
  sortPriority?: number | boolean;

  // Filter
  filters?: Filters;
  filterFn?: FilterFn<RecordType> | boolean;
}
