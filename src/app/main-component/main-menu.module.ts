import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
 
//Services
import { SuperAdminAuthGuard } from "../guards/superadminauth-guard.service";
import { AuthService } from "../auth/auth.service";
import {MenuFooterService} from "../menu-footer/menu-footer.service";
import { MainMenuRouting } from "./main-menu.routing";
 
//Module details
  import {ProfileModule} from "../sub-component/profile-page/profile.module";
  import {TrendingModule} from "../sub-component/trending-card/trending-card.module";
import {DashboardModule} from "../sub-component/dashboard-component/dashboard.module";
import {MenuFooterModule} from "../menu-footer/menu-footer.module";
import {ViewVideoModule} from "../sub-component/view-video/view-video.module";
//sub Component Module
import { DashboardComponentComponent } from '../sub-component/dashboard-component/dashboard-component.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import {CommonValidationService} from "../guards/common-validation.service";

@NgModule({
  imports: [
   
    RouterModule,
    MainMenuRouting  ,
    DashboardModule,
    ProfileModule,
    TrendingModule,
    MenuFooterModule,
    ViewVideoModule,
    CommonModule
  ],  
  declarations: [ DashboardComponentComponent],
  providers: [SuperAdminAuthGuard,AuthService,MenuFooterService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
 
    
})
export class MainMenuModule {

}
