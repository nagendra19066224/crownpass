import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./shared/guard/auth.guard";
import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent
  }, {
    path: 'account-settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/account-settings/account-settings.module').then(m => m.AccountSettingsModule)
  }, {
    path: 'regions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/regions/regions.module').then(m => m.RegionsModule)
  }, {
    path: 'covid-data',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/covid-data/covid-data.module').then(m => m.CovidDataModule)
  },
   {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
