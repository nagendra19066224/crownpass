import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderModule } from './header/header.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import {RouterModule} from '@angular/router';


import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SidebarComponent,
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FontAwesomeModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderModule,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    
  ]
})
export class SharedModule { }
