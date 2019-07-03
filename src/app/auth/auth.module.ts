import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { ClientRegisterComponent } from './client-register/client-register.component'; 
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

import { AuthService } from "./auth.service";
 
@NgModule({
  imports: [   
    
    FormsModule,
    CommonModule,
    ReactiveFormsModule,    
    AuthRoutingModule
     
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ClientRegisterComponent  
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    ClientRegisterComponent  
  ], 
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AuthModule { }