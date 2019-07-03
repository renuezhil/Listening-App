import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router"; 
import { LoginComponent } from "./login/login.component";
import { ClientRegisterComponent } from './client-register/client-register.component'; 
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { CommonModule } from '@angular/common';
 

@NgModule({
  imports: [
         RouterModule.forChild([
      {  path: '',    redirectTo: 'login',    pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: ClientRegisterComponent  },
  { path: 'forgetpassword', component: ForgotPasswordComponent }
        
    ])
  ],
  exports: [RouterModule] 
})
 
export class AuthRoutingModule {
}
