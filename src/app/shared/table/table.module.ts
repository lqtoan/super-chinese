import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

import { NzTableModule } from 'ng-zorro-antd/table';

const nzModules = [NzTableModule];

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, nzModules, TranslateModule],
  exports: [TableComponent],
})
export class TableModule {}
