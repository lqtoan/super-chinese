import { DictionaryComponent } from './dictionary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';

const nzModules = [
  NzSpinModule,
  NzListModule,
  NzDrawerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzButtonModule,
  NzPopconfirmModule,
  NzIconModule,
];

@NgModule({
  declarations: [DictionaryComponent],
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
  ],
})
export class DictionaryModule {}
