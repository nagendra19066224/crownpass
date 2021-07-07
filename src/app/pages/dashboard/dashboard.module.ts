import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../../shared/shared.module';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    ChartsModule
  ]
})
export class DashboardModule { }
