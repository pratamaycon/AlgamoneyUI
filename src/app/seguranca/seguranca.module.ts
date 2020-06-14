import { LogoutService } from './services/logout.service';
import { AuthGuard } from './guard/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca.routes';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
@NgModule({
  declarations: [LoginFormComponent, NaoAutorizadoComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [],
  providers: [AuthGuard, LogoutService],
})
export class SegurancaModule {}
