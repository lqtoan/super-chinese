import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableCellDirective } from './directives/table-cell.directive';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzRadioModule } from 'ng-zorro-antd/radio';

const nzModules = [NzTableModule, NzEmptyModule, NzTagModule, NzRadioModule];

@NgModule({
  declarations: [TableComponent, TableCellDirective],
  imports: [CommonModule, nzModules, TranslateModule],
  exports: [TableComponent, TableCellDirective],
})
export class TableModule {}
