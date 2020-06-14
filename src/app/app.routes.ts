import { NaoAutorizadoComponent } from './seguranca/nao-autorizado/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';

const ROUTES: Routes = [
  {path: 'pessoas', loadChildren: () => import('src/app/pesssoas/pessoas.module').then(m => m.PessoasModule)},
  {path: 'lancamentos', loadChildren: () => import('src/app/lancamentos/lancamentos.module').then(m => m.LancamentosModule)},
  {path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'relatorios', loadChildren: () => import('src/app/relatorios/relatorios.module').then(m => m.RelatoriosModule)},

  { path: '' , redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
