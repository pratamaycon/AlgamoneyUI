import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { AuthGuard } from '../seguranca/guard/auth.guard';

const ROUTES: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA'],
    },
  },
  {
    path: 'novo',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA'],
    },
  },
  {
    path: ':codigo',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PessoasRoutingModule {}
