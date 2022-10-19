import { TranslateModule } from '@ngx-translate/core';
import { AudioListModule } from '../../shared/modules/audio-list/audio-list.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurriculumComponent } from './../../pages/curriculum/curriculum.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const nzModules = [NzTabsModule];

@NgModule({
  declarations: [CurriculumComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CurriculumComponent,
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
