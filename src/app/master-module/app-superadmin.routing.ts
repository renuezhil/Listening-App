import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
 
// import { SuperAdminAuthGuard } from "../guards/superadminauth-guard.service";
import { DashboardComponentComponent } from '../sub-component/dashboard-component/dashboard-component.component';
 

@NgModule({
  imports: [  
      RouterModule.forChild([    
{ path: 'dashboard', component: DashboardComponentComponent } 
  ])],
  exports: [
    RouterModule
  ]
})
export class AppSuperAdminRouting {
}
