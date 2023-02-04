import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptorProviders } from './core/inteceptors/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { nzConfig } from './nz-config';

import { NzSpinModule } from 'ng-zorro-antd/spin';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { enUS } from 'date-fns/locale';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';

registerLocaleData(vi);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${window.location.origin}/assets/i18n/`, '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: localStorage.getItem('language')?.toString() || 'vi',
    }),
    NzSpinModule,
  ],
  providers: [
    interceptorProviders,
    { provide: NZ_DATE_LOCALE, useValue: enUS },
    { provide: NZ_CONFIG, useValue: nzConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
