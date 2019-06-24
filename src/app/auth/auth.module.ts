import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login.component";

import { ForgotPasswordComponent } from "./forgot-password.component";
import { AuthService } from "./auth.service";

import { AmControlsModule } from "../am-controls/am-controls.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmControlsModule,
    AuthRoutingModule
  ],
  declarations: [ForgotPasswordComponent, LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }