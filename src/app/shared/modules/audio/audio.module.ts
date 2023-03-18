import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioListComponent } from './audio.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzProgressModule } from 'ng-zorro-antd/progress';

const nzModules = [NzIconModule, NzButtonModule, NzSpinModule, NzProgressModule, NzToolTipModule];

@NgModule({
  declarations: [AudioListComponent],
  imports: [CommonModule, NgxPaginationModule, nzModules, TranslateModule],
  exports: [AudioListComponent],
})
export class AudioListModule {}
