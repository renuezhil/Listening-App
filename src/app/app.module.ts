import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { AuthConfig, AuthHttp, provideAuth } from "angular2-jwt";
import { AuthModule } from "./auth/auth.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

// import { TokenInterceptor } from "./core/interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TokenService } from "./services/token-service";
import { SweetAlertService } from "./services/sweet-alert-service";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { IdleTimeoutService } from './services/idleTimeout.service';
import { ToastrService } from './services/toastr.service';
import { RouterModule } from "@angular/router";
 
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppSuperAdminComponent } from "./master-module/app-superadmin.component";
import {LoginMenuComponent} from "./auth/login-menu.component";
 
 
import { MenuFooterModule } from "./menu-footer/menu-footer.module";
import { AppRoutingModule } from "./app.routing";

import { SuperAdminAuthGuard } from "./guards/superadminauth-guard.service";
import { AuthService } from "./auth/auth.service";
// import {CommonValidationService} from "./guards/common-validation.service";
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
    AppComponent ,
    AppSuperAdminComponent,
    LoginMenuComponent 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // AuthModule,
    // AppSuperAdminModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    MenuFooterModule,
     
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Http, RequestOptions]
      }
    })
  ],
  providers: [
 
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    TokenService, SweetAlertService, IdleTimeoutService,
    ToastrService,SuperAdminAuthGuard,AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
