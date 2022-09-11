import { LayoutModule } from './../core/layout/layout.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

const nzModules = [NzIconModule];

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, TranslateModule, MainPageRoutingModule, nzModules, LayoutModule],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class MainPageModule {}
