import { Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { plainToClass } from "class-transformer/index";
import { BaseService } from "../services/base-service";
import { LoggedInUser, LoginUser, ForgotPassword, UserRegsiter } from "./auth.models";
import { Validate } from "../utilities/data-validator";
import { Router } from "@angular/router";
import { TokenService } from "../services/token-service";
import { EventEmitter } from "@angular/core";

import { RolesEnum } from "../guards/roles-enum";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class AuthService extends BaseService {

  @Output() profileNameUpdated = new EventEmitter<any>();

  constructor(http: HttpClient, private router: Router, private tokenService: TokenService) {
    super(http);
  }

  
  loginUser(user: LoginUser): Observable<LoggedInUser> {
   
   return super.post('login', user )
    //, (json: any) =>   json.data )
      .do((loggedInUser: LoggedInUser) => {
        // let userData: LoggedInUser;  
        // userData=     loggedInUser.data;
        // userData.name = loggedInUser.user.first_name + loggedInUser.data.user.last_name;
        // userData.accessToken = loggedInUser.data.token.acess_token;
        // userData.roleId = 0;
        // userData.userId= loggedInUser.data.user.id;
        this.storeLoggedInUser(loggedInUser);
      }) 

     
  }
   
  forgotPassword(forgotPassword: ForgotPassword): Observable<boolean> {
    return super.post('forgot-password', forgotPassword);
  }

  userregistartion(userregsiter: UserRegsiter): Observable<boolean> {
    return super.post('register', userregsiter);
  }

  storeLoggedInUser(loggedInUser: LoggedInUser) {
    loggedInUser. name  = `${loggedInUser.data.user.first_name} ${loggedInUser.data.user.last_name}`
    loggedInUser. roleId =2;
    loggedInUser. userId =loggedInUser.data.user.id.toString();
    loggedInUser.accessToken=loggedInUser.data.token;
    loggedInUser.emailid=loggedInUser.data.user.email;

    this.tokenService.setItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY, loggedInUser.data.token.access_token);
    this.tokenService.setItem(TokenService.AUTH_USER_PROFILE_NAME_KEY, `${loggedInUser.data.user.first_name} ${loggedInUser.data.user.last_name}`);
    this.tokenService.setItem(TokenService.AUTH_USER_ROLE_ID_KEY, "2");
    this.tokenService.setItem(TokenService.AUTH_USER_EMAIL_ID_KEY, loggedInUser.data.user.email);
  }

  setProfileName(profileName: string) {
    this.tokenService.setItem(TokenService.AUTH_USER_PROFILE_NAME_KEY, profileName);
    this.profileNameUpdated.emit(profileName);
  }

  navigateUser(user: LoggedInUser) {
    if (user.roleId == RolesEnum.SuperAdmin || user.roleId == RolesEnum.Staff || user.roleId == 0)
      this.router.navigate(['/super-admin/home']);
    else if (user.roleId == RolesEnum.Admin)
      this.router.navigate(['/organization/home']);
  }

  getAccessToken(): string {
    return this.tokenService.getItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return Validate.isNull(this.getAccessToken()) ? false : true;
  }

  
  isAllowLoginMenu(): boolean {
    return Validate.isNull(this.getAccessToken()) ? true : false;
  }
  getProfileName(): string {
    return this.tokenService.getItem(TokenService.AUTH_USER_PROFILE_NAME_KEY);
  }

  getRoleId(): number {
    var values = this.tokenService.getItem(TokenService.AUTH_USER_ROLE_ID_KEY);
    var roleId = parseInt(values);
    return roleId;
  }

  logout() {
    this.tokenService.removeItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY);
    this.tokenService.removeItem(TokenService.AUTH_USER_PROFILE_NAME_KEY);
    this.tokenService.removeItem(TokenService.AUTH_USER_PROFILE_OTHER_KEY);
    this.tokenService.removeItem(TokenService.AUTH_USER_ROLE_ID_KEY);
    this.tokenService.removeItem(TokenService.AUTH_USER_EMAIL_ID_KEY);
  }

}
