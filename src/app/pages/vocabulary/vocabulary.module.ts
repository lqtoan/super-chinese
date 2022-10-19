import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from './vocabulary.component';
import { RouterModule } from '@angular/router';
import { VocabularyListModule } from 'src/app/shared/modules/vocabulary-list/vocabulary-list.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const nzModules = [NzTabsModule];

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
    VocabularyListModule,
  ],
})
export class VocabularyModule {}
