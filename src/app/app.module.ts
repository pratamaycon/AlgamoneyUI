import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';

import { registerLocaleData } from '@angular/common';
import localept from '@angular/common/locales/pt';
import { AppRoutingModule } from './app.routes';

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, CoreModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
