import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppSuperAdminRouting } from "./app-superadmin.routing";
import { AppSuperAdminComponent } from "./app-superadmin.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperAdminAuthGuard } from "../guards/superadminauth-guard.service";
import { HomeModule } from "../home/home.module";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    AppSuperAdminRouting,
    HomeModule
  ],
  exports: [],
  declarations: [AppSuperAdminComponent],
  providers: [SuperAdminAuthGuard]
})
export class AppSuperAdminModule {

}
