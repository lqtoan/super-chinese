import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

const nzModules = [NzTableModule, NzEmptyModule];

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, nzModules, TranslateModule],
  exports: [TableComponent],
})
export class TableModule {}
