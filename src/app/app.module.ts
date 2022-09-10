import { NzSpinModule } from 'ng-zorro-antd/spin';
import { interceptorProviders } from './core/inteceptor/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment as env } from '../environments/environment';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

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
    NzSpinModule,
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
