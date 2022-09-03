import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ChangeLanguageComponent } from './change-language/change-language.component';

@NgModule({
  declarations: [HomeComponent, ChangeLanguageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    TranslateModule,
  ],
})
export class HomeModule {}
