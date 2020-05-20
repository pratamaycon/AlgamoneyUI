import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';


const ROUTES: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/novo', component: PessoasCadastroComponent },
  { path: 'pessoas/:codigo', component: PessoasCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class PessoasRoutingModule { }
