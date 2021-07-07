import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthModule } from './pages/auth/auth.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AccountSettingsModule } from './pages/account-settings/account-settings.module'
import { RegionsModule } from './pages/regions/regions.module';
import { CovidDataModule } from './pages/covid-data/covid-data.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    BrowserAnimationsModule,
    DashboardModule,
    SharedModule,
    AccountSettingsModule,
    RegionsModule,
    CovidDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
