import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios.routes';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [RelatoriosComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    ButtonModule
  ]
})
export class RelatoriosModule { }
