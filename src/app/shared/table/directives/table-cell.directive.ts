import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableCell]',
})
export class TableCellDirective<T = unknown> {
  @Input('appTableCell') type: string | undefined;

  constructor(public readonly template: TemplateRef<TableCellContext<T>>) {}
}

export interface TableCellContext<T> {
  $implicit: T;
  cellType: string;
  // rowIndex: number;
  // cellIndex: number;
}
