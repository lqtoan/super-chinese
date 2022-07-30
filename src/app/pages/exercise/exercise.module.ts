import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExerciseComponent } from './exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioListModule } from 'src/app/shared/audio-list/audio-list.module';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const nzModules = [NzTabsModule];

@NgModule({
  declarations: [ExerciseComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExerciseComponent,
      },
    ]),
    CommonModule,
    AudioListModule,
    NgxPaginationModule,
    nzModules,
    TranslateModule
  ],
})
export class ExerciseModule {}
