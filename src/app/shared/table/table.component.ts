import { TableCellContext, TableCellDirective } from './directives/table-cell.directive';
import { Table, TableHeader } from './models/index';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
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
  private allRecordsChecked = false;
  private indeterminate = false;

  readonly trackByIndex: any;
  @Input() records: RecordType[] = [];
  @Input() idField: keyof RecordType = '_id';
  @Input() total: number = this.records.length;
  @Input() isLoading: boolean = true;
  @Input() headers: TableHeader<RecordType>[] = [];
  @Input() @InputBoolean() isSelectable = false;
  @Input() @InputBoolean() clientPagination = false;

  // @Output() readonly checkedKeysChange = new EventEmitter<IdType[]>();

  @ContentChildren(TableCellDirective) readonly customCells!: QueryList<TableCellDirective<RecordType>>;
  private cellTemplates: Record<string, TemplateRef<TableCellContext<RecordType>>> = {};

  @ViewChild('virtualTable', { static: false }) table?: Table<RecordType>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.customCells.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.mapCustomCells());
    this.mapCustomCells();
  }

  private mapCustomCells() {
    this.cellTemplates = this.customCells.reduce((acc, item) => ({ ...acc, [item.type || '']: item.template }), {});
    this.cdr.markForCheck();
  }

  isChecked(id: IdType): boolean {
    return this._checkedKeys.has(id);
  }

  private onCheck(id: IdType, checked: boolean) {
    this.updateCheckedKeys(id, checked);
    this.refreshCheckedStatus();

    // this.checkedKeysChange.emit(this.checkedKeys);
    console.log('onCheck', this._checkedKeys);
  }

  private updateCheckedKeys(id: IdType, checked: boolean) {
    if (checked) {
      this._checkedKeys.add(id);
    } else {
      this._checkedKeys.delete(id);
    }
  }

  private refreshCheckedStatus() {
    this.allRecordsChecked =
      this._checkedKeys.size > 0 && this.records.every((record) => this._checkedKeys.has(record[this.idField]));

    this.indeterminate =
      this._checkedKeys.size > 0 &&
      this.records.some((record) => this._checkedKeys.has(record[this.idField])) &&
      !this.allRecordsChecked;
  }

  private onCheckAll(checked: boolean) {
    this.records.forEach((record) => this.updateCheckedKeys(record[this.idField], checked));
    this.refreshCheckedStatus();

    // this.checkedKeysChange.emit(this.checkedKeys);
    console.log('onCheckAll', this._checkedKeys);
  }

  ngAfterViewInit() {
    this.table?.cdkVirtualScrollViewport?.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        // console.log({
        //   index: data,
        //   totalRows: document.getElementsByTagName('tr').length,
        //   itemSize: this.table?.nzVirtualItemSize,
        // });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
