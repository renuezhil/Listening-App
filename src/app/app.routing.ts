import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from "./main-component/main-menu.component";
import {LoginMenuComponent} from "./auth/login-menu.component"; 

 
import {SuperAdminAuthGuard} from "./guards/superadminauth-guard.service";
// import {CommonAuthService} from './common-auth.service';
const routes: Routes = [
  {  path: '',
  redirectTo: 'login',
  pathMatch: 'full'}, 
  {
    path: '',
    component: MainMenuComponent,    
    canActivate: [SuperAdminAuthGuard], 
    children: [
        {
      path: '',
      loadChildren: './main-component/main-menu.module#MainMenuModule'
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
