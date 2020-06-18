import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from '../shared/shared.module';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasRoutingModule } from './pessoas.routes';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [PessoasPesquisaComponent, PessoasCadastroComponent, PessoasGridComponent, PessoaCadastroContatoComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    SharedModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoasModule {}
