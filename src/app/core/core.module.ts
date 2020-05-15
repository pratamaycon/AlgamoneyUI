import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/service/lancamento.service';
import { PessoaService } from '../pesssoas/services/pessoa.service';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';




@NgModule({
  declarations: [NavbarComponent, HomeComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
