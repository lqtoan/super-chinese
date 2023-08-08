import { LayoutRoutingModule } from './layout-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { UserMenuComponent } from './user-menu/user-menu.component';
import { LayoutComponent } from './layout.component';
import { NotificationComponent } from './notification/notification.component';
import { ChangeLanguageComponent } from './change-language/change-language.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NavbarComponent } from './navbar/navbar.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

const nzModules = [
  NzAvatarModule,
  NzDropDownModule,
  NzIconModule,
  NzButtonModule,
  NzSpinModule,
  NzNotificationModule,
  NzToolTipModule,
  NzPopconfirmModule,
  NzSpinModule,
  NzBadgeModule,
];

@NgModule({
  declarations: [UserMenuComponent, ChangeLanguageComponent, LayoutComponent, NavbarComponent, NotificationComponent],
  imports: [CommonModule, TranslateModule, nzModules, LayoutRoutingModule],
  exports: [UserMenuComponent, ChangeLanguageComponent, LayoutComponent],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class LayoutModule {}
