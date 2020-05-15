import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pesssoas/pessoas.module';
import { CoreModule } from './core/core.module';

import { registerLocaleData } from '@angular/common';
import localept from '@angular/common/locales/pt';

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
