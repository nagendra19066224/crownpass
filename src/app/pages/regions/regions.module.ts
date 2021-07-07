import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRegionComponent } from './add-region/add-region.component';
import { DeleteDialogComponent, SavedRegionsComponent } from './saved-regions/saved-regions.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: SavedRegionsComponent
  }, {
    path: 'add-region',
    component: AddRegionComponent
  }
 
];

@NgModule({
  declarations: [
    AddRegionComponent,
    SavedRegionsComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class RegionsModule { }
