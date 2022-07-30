import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from './vocabulary.component';
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

const nzModules = [NzCollapseModule, NzTabsModule];

@NgModule({
  declarations: [VocabularyComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: VocabularyComponent,
      },
    ]),
    CommonModule,
    nzModules,
    TranslateModule,
  ],
})
export class VocabularyModule {}
