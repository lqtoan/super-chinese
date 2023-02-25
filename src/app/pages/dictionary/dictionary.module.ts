import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DictionaryComponent } from './dictionary.component';
import { DictionaryListComponent } from './dictionary-list/dictionary-list.component';
import { DictionaryFormComponent } from './dictionary-form/dictionary-form.component';
import { DictionaryItemComponent } from './dictionary-item/dictionary-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ScrollingModule } from '@angular/cdk/scrolling';

const nzModules = [
  NzSpinModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzPopconfirmModule,
  NzIconModule,
  NzSelectModule,
  NzTagModule,
  NzToolTipModule,
  NzDropDownModule,
  NzModalModule,
  NzProgressModule,
];

@NgModule({
  declarations: [DictionaryComponent, DictionaryListComponent, DictionaryFormComponent, DictionaryItemComponent],
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
    ScrollingModule,
  ],
})
export class DictionaryModule { }
