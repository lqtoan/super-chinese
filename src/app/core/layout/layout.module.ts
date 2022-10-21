import { LayoutRoutingModule } from './layout-routing.module';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LayoutComponent } from './layout.component';

const nzModules = [NzAvatarModule, NzDropDownModule, NzIconModule, NzButtonModule];

@NgModule({
  declarations: [UserMenuComponent, ChangeLanguageComponent, LayoutComponent],
  imports: [CommonModule, TranslateModule, nzModules, LayoutRoutingModule],
  exports: [UserMenuComponent, ChangeLanguageComponent, LayoutComponent],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class LayoutModule {}
