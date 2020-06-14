import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routes';
import { PanelModule } from 'primeng/panel';
import { SharedModule } from './../shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
  ],
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule {}
