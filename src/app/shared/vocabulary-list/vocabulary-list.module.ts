import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyListComponent } from './vocabulary-list.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const nzModules = [NzCollapseModule, NzTabsModule, NzSpinModule];

@NgModule({
  declarations: [VocabularyListComponent],
  imports: [CommonModule, TranslateModule, nzModules],
  exports: [VocabularyListComponent],
})
export class VocabularyListModule {}
