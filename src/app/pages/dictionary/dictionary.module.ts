import { TableModule } from '../../shared/modules/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DictionaryComponent } from './dictionary.component';
import { DictionaryListComponent } from './dictionary-list/dictionary-list.component';
import { DictionaryFormComponent } from './dictionary-form/dictionary-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

const nzModules = [
  NzSpinModule,
  NzDrawerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzButtonModule,
  NzPopconfirmModule,
  NzIconModule,
  NzSelectModule,
  NzTagModule,
  NzSwitchModule,
];

@NgModule({
  declarations: [DictionaryComponent, DictionaryListComponent, DictionaryFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DictionaryComponent,
      },
    ]),
    TranslateModule,
    nzModules,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
  ],
})
export class DictionaryModule {}
