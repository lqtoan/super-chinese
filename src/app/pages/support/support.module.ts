import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';

const nzModules = [NzIconModule];

@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SupportComponent,
      },
    ]),
    nzModules,
  ],
})
export class SupportModule {}
