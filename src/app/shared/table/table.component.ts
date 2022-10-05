import { TableCellContext, TableCellDirective } from './directives/table-cell.directive';
import { TableHeader } from './models/index';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<RecordType> {
  @Input() trackByIndex: any;
  @Input() records: RecordType[] = [];
  @Input() total: number = this.records.length;
  @Input() isLoading: boolean = true;
  @Input() headers: TableHeader<RecordType>[] = [];

  @ContentChildren(TableCellDirective) readonly customCells!: QueryList<TableCellDirective<RecordType>>;
  cellTemplates: Record<string, TemplateRef<TableCellContext<RecordType>>> = {};

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
}
