import { ChangeLanguageComponent } from './change-language/change-language.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

const nzModules = [NzAvatarModule, NzDropDownModule, NzIconModule, NzButtonModule];

@NgModule({
  declarations: [UserMenuComponent, ChangeLanguageComponent],
  imports: [CommonModule, TranslateModule, nzModules],
  exports: [UserMenuComponent, ChangeLanguageComponent],
})
export class LayoutModule {}
