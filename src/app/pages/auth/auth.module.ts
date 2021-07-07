import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class AuthModule { }
