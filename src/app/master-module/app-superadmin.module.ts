import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
 
import { SuperAdminAuthGuard } from "../guards/superadminauth-guard.service";
import { AuthService } from "../auth/auth.service";
import { AppSuperAdminRouting } from "./app-superadmin.routing";
 
//sub Component Module
  import {ProfileModule} from "../sub-component/profile-page/profile.module";
  import {TrendingModule} from "../sub-component/trending-card/trending-card.module";

import {DashboardModule} from "../sub-component/dashboard-component/dashboard.module";

import { DashboardComponentComponent } from '../sub-component/dashboard-component/dashboard-component.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import {CommonValidationService} from "../guards/common-validation.service";
@NgModule({
  imports: [
    // BrowserAnimationsModule,
 
    RouterModule,
    AppSuperAdminRouting  ,
    DashboardModule,
    ProfileModule,
    TrendingModule,
    CommonModule
  ],  
  declarations: [ DashboardComponentComponent],
  providers: [SuperAdminAuthGuard,AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
 
    
})
export class AppSuperAdminModule {

}
