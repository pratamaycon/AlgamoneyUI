import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos.routes';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';

@NgModule({
  declarations: [LancamentosPesquisaComponent, LancamentosCadastroComponent, LancamentosGridComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    FileUploadModule,
    SharedModule,
    ProgressSpinnerModule,
    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule {}
