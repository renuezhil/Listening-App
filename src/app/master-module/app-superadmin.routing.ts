import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppSuperAdminComponent } from "./app-superadmin.component";
import { SuperAdminAuthGuard } from "../guards/superadminauth-guard.service";
import { SuperAdminHomeComponent } from "../home/superadmin-home.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'super-admin',
        component: AppSuperAdminComponent,
        canActivate: [SuperAdminAuthGuard],
        children: [
          { path: 'home', component: SuperAdminHomeComponent },
        ]
      }
    ])
  ]
})
export class AppSuperAdminRouting {
}
