import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appListDetails]',
})
export class ListDetailsDirective<T = unknown> {
  @Input('appListDetails') type: string | undefined;

  constructor(public readonly template: TemplateRef<ListDetailsContext<T>>) {}
}

export interface ListDetailsContext<T> {
  $implicit: T;
  detailsType: string;
  // rowIndex: number;
  // cellIndex: number;
}
