import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSuperAdminComponent } from "./master-module/app-superadmin.component";
import {LoginMenuComponent} from "./auth/login-menu.component"; 
 
import {SuperAdminAuthGuard} from "./guards/superadminauth-guard.service";
// import {CommonAuthService} from './common-auth.service';
const routes: Routes = [
  {  path: '',
  redirectTo: 'login',
  pathMatch: 'full'}, 
  {
    path: '',
    component: AppSuperAdminComponent,    
    canActivate: [SuperAdminAuthGuard], 
    children: [
        {
      path: '',
      loadChildren: './master-module/app-superadmin.module#AppSuperAdminModule'
  }]  },
  {
    path: '',
    component: LoginMenuComponent,    
    children: [
        {
      path: '',
      loadChildren: './auth/auth.module#AuthModule'
  }]  }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
