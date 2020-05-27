import { TokenInterceptor } from './seguranca/service/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from './core/core.module';

import { registerLocaleData } from '@angular/common';
import localept from '@angular/common/locales/pt';
import { AppRoutingModule } from './app.routes';

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
