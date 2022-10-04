import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TableCellDirective } from './directives/table-cell.directive';

const nzModules = [NzTableModule, NzEmptyModule];

@NgModule({
  declarations: [TableComponent, TableCellDirective],
  imports: [CommonModule, nzModules, TranslateModule],
  exports: [TableComponent, TableCellDirective],
})
export class TableModule {}
