import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const nzModules = [NzIconModule, NzDividerModule];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
      },
    ]),
    CommonModule,
    nzModules,
    TranslateModule,
  ],
  exports: [AboutComponent],
})
export class AboutModule {}
