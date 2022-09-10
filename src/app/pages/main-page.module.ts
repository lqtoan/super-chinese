import { LayoutModule } from './../core/layout/layout.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${window.location.origin}/assets/i18n/`, '.json');
}

const nzModules = [NzIconModule];

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MainPageRoutingModule,
    nzModules,
    LayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: localStorage.getItem('language')?.toString() || 'vi',
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class MainPageModule {}
