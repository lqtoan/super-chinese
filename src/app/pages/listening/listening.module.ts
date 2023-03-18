import { TranslateModule } from '@ngx-translate/core';
import { AudioListModule } from '../../shared/modules/audio/audio.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListeningComponent } from './listening.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const nzModules = [NzTabsModule];

@NgModule({
  declarations: [ListeningComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ListeningComponent,
      },
    ]),
    CommonModule,
    NgxPaginationModule,
    AudioListModule,
    nzModules,
    TranslateModule,
  ],
})
export class CurriculumModule {}
