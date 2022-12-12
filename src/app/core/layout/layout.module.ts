import { LayoutRoutingModule } from './layout-routing.module';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { LayoutComponent } from './layout.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NavbarComponent } from './navbar/navbar.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const nzModules = [
  NzAvatarModule,
  NzDropDownModule,
  NzIconModule,
  NzButtonModule,
  NzSpinModule,
  NzNotificationModule,
  NzToolTipModule,
  NzTabsModule,
];

@NgModule({
  declarations: [UserMenuComponent, ChangeLanguageComponent, LayoutComponent, NavbarComponent],
  imports: [CommonModule, TranslateModule, nzModules, LayoutRoutingModule],
  exports: [UserMenuComponent, ChangeLanguageComponent, LayoutComponent],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class LayoutModule {}
