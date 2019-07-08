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
 
//Module 
import { MenuFooterModule } from "./menu-footer/menu-footer.module";
import { AppRoutingModule } from "./app.routing";

//Component
import { AppComponent } from './app.component';
import { MainMenuComponent } from "./main-component/main-menu.component";
import {LoginMenuComponent} from "./auth/login-menu.component";

//Service
import { SuperAdminAuthGuard } from "./guards/superadminauth-guard.service";
import { AuthService } from "./auth/auth.service";
import { CommonValidationService } from "./services/common-validation.service";
 
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
    MainMenuComponent,
    LoginMenuComponent 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,  
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
    ToastrService,SuperAdminAuthGuard,AuthService,CommonValidationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
