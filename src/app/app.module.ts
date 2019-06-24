import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from "./auth/auth.service"
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { AppComponent } from './app.component';

import { AuthConfig, AuthHttp, provideAuth } from "angular2-jwt";
import { AuthModule } from "./auth/auth.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { routing } from "./app.routing";
// import { TokenInterceptor } from "./core/interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TokenService } from "./services/token-service";
import { SweetAlertService } from "./services/sweet-alert-service";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { IdleTimeoutService } from './services/idleTimeout.service';
import { ToastrService } from './services/toastr.service';
import { RouterModule } from "@angular/router";

import { AppSuperAdminModule } from "./master-module/app-superadmin.module";
import { LoginComponent } from "./auth/login.component";

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { ToastrModule } from 'ng6-toastr-notifications';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CardComponentComponent } from './card-component/card-component.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY))
  }), http, options);
}


export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return localStorage.getItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    MenuBarComponent,
    CardComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AppSuperAdminModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent }, { path: 'profile', component: ProfilePageComponent }
    ]),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Http, RequestOptions]
      }
    })
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: AuthHttp,
    //   useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]
    // },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    TokenService, SweetAlertService, IdleTimeoutService,
    ToastrService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
