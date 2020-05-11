import { PessoasCadastroComponent } from './pesssoas/pessoas-cadastro/pessoas-cadastro.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PessoasPesquisaComponent } from './pesssoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';


export const ROUTES: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'lancamentos-pesquisa', component: LancamentosPesquisaComponent },
  { path: 'lancamentos-cadastro', component: LancamentosCadastroComponent },
  { path: 'pessoas-pesquisa', component: PessoasPesquisaComponent },
  { path: 'pessoas-cadastro', component: PessoasCadastroComponent }
];
