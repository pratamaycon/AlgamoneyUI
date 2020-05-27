import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/guard/auth.guard';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';

const ROUTES: Routes = [
  {
    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] },
  },
  {
    path: 'lancamentos/novo',
    component: LancamentosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] },
  },
  {
    path: 'lancamentos/:codigo',
    component: LancamentosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class LancamentosRoutingModule {}
