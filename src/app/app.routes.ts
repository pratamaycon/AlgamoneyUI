import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './core/home/home.component';

const ROUTES: Routes = [
  { path: '' , component: HomeComponent},
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
