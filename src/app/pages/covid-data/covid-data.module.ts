import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCovidDataComponent } from './add-covid-data/add-covid-data.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent, ListCovidDataComponent } from './list-covid-data/list-covid-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: ListCovidDataComponent
  },
  {
    path: 'add-covid-data',
    component: AddCovidDataComponent
  }

];

@NgModule({
  declarations: [
    AddCovidDataComponent,
    ListCovidDataComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
  ]
})
export class CovidDataModule { }
