import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';

const nzModules = [NzTabsModule];

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseComponent,
      },
    ]),
    nzModules,
    TranslateModule,
  ],
})
export class CourseModule {}
