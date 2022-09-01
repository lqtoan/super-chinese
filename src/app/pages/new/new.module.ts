import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewComponent,
      },
    ]),
  ]
})
export class NewModule { }
