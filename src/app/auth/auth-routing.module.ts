import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
import {ForgotPasswordComponent} from "./forgot-password.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
