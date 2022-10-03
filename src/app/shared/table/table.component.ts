import { TableHeader } from './models/table-header.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() trackByIndex: any;
  @Input() records: any;
  @Input() isLoading: boolean = true;
  @Input() headers: TableHeader<any>[] = [];
}
