import { LancamentoService } from './lancamentos/service/lancamento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pesssoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
