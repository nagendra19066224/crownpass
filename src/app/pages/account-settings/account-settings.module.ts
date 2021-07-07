import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component'
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent
  }, {
    path: 'new-user',
    component: NewUserComponent
  }

];


@NgModule({
  declarations: [
    AccountSettingsComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class AccountSettingsModule { }
