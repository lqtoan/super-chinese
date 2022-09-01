import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { RouterModule } from '@angular/router';
import { ChangeLanguageComponent } from './change-language/change-language.component';

@NgModule({
  declarations: [SettingComponent, ChangeLanguageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingComponent,
      },
    ]),
    TranslateModule
  ],
})
export class SettingModule {}
