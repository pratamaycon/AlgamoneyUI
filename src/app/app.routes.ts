import { NaoAutorizadoComponent } from './seguranca/nao-autorizado/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';

const ROUTES: Routes = [
  { path: '' , redirectTo: 'lancamentos', pathMatch: 'full'},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
