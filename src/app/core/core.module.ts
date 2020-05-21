import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './service/error-handler.service';
import { LancamentoService } from '../lancamentos/service/lancamento.service';
import { PessoaService } from '../pesssoas/services/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { PessoasModule } from '../pesssoas/pessoas.module';
import { SegurancaModule } from '../seguranca/seguranca.module';
import { AuthService } from '../seguranca/service/auth.service';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    SidebarModule,
    RouterModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
  ],
  exports: [NavbarComponent, HomeComponent, ToastyModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService,
    Title,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
})
export class CoreModule {}
