import { TableCellContext, TableCellDirective } from './directives/table-cell.directive';
import { Table, TableHeader } from './models/index';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<RecordType extends { [key: string]: any }, IdType> implements AfterViewInit, OnDestroy {
  private _checkedKeys: Set<IdType> = new Set<IdType>();

  get checkedKeys() {
    return Array.from(this._checkedKeys).filter(Boolean);
  }
  @Input() set checkedKeys(value: IdType[]) {
    this._checkedKeys = new Set(value.filter(Boolean));
    this.refreshCheckedStatus();
  }

  @Input() trackByIndex: any;
  @Input() records: RecordType[] = [];
  @Input() idField: keyof RecordType = '_id';
  @Input() total: number = this.records.length;
  @Input() @InputBoolean() isLoading = true;
  @Input() headers: TableHeader<RecordType>[] = [];
  @Input() @InputBoolean() allowSelectRow = true;
  @Input() @InputBoolean() allowSelectMultipleRow = true;
  @Input() @InputBoolean() allowSelectAllRows = true;

  @Output() readonly checkedKeysChange = new EventEmitter<IdType[]>();

  @ContentChildren(TableCellDirective) readonly customCells!: QueryList<TableCellDirective<RecordType>>;
  cellTemplates: Record<string, TemplateRef<TableCellContext<RecordType>>> = {};

  @ViewChild('virtualTable', { static: false }) nzTableComponent?: Table<RecordType>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.customCells.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.mapCustomCells());
    this.mapCustomCells();
  }

  private mapCustomCells(): void {
    this.cellTemplates = this.customCells.reduce((acc, item) => ({ ...acc, [item.type || '']: item.template }), {});
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        // console.log('scroll index to', data);
      });
  }

  isChecked(id: IdType): boolean {
    return this._checkedKeys.has(id);
  }

  onItemChecked(id: IdType, checked: boolean): void {
    if (!this.allowSelectMultipleRow) {
      for (const key of this._checkedKeys.keys()) {
        this.updateCheckedSet(key, false);
      }
    }
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();

    this.checkedKeysChange.emit(this.checkedKeys);
  }

  onAllChecked(checked: boolean): void {
    this.records.forEach((record) => this.updateCheckedSet(record[this.idField], checked));
    this.refreshCheckedStatus();

    this.checkedKeysChange.emit(this.checkedKeys);
  }

  private updateCheckedSet(id: IdType, checked: boolean): void {
    if (checked) {
      this._checkedKeys.add(id);
    } else {
      this._checkedKeys.delete(id);
    }
  }

  allRecordsChecked = false;
  indeterminate = false;
  private refreshCheckedStatus(): void {
    this.allRecordsChecked =
      this._checkedKeys.size > 0 && this.records.every((record) => this._checkedKeys.has(record[this.idField]));

    this.indeterminate =
      this._checkedKeys.size > 0 &&
      this.records.some((record) => this._checkedKeys.has(record[this.idField])) &&
      !this.allRecordsChecked;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
