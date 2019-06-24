import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SuperAdminHomeComponent } from "./superadmin-home.component";
import { HomeService } from "./home.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SuperAdminHomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
