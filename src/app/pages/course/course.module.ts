import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from './../../core/pipe/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

import { TranslateModule } from '@ngx-translate/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';

const nzModules = [
  NzTabsModule,
  NzSpinModule,
  NzDrawerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzDatePickerModule,
  NzInputNumberModule,
  NzButtonModule,
];

@NgModule({
  declarations: [CourseComponent, CourseListComponent, CourseFormComponent],
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
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CourseModule {}
