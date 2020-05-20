import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/service/lancamento.service';
import { PessoaService } from '../pesssoas/services/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule,
    SidebarModule,
  ],
  exports: [NavbarComponent, HomeComponent, ToastyModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CategoriaService,
    Title
  ],
})
export class CoreModule {}
