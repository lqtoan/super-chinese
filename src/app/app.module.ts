import { NzSpinModule } from 'ng-zorro-antd/spin';
import { interceptorProviders } from './core/inteceptor/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment as env } from '../environments/environment';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

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
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
