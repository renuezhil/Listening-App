import { Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { plainToClass } from "class-transformer/index";
import { BaseService } from "../services/base-service";
import { LoggedInUser, LoginUser, ForgotPassword } from "./auth.models";
import { Validate } from "../utilities/data-validator";
import { Router } from "@angular/router";
import { TokenService } from "../services/token-service";
import { EventEmitter } from "@angular/core";

import { RolesEnum } from "../guards/roles-enum";


@Injectable()
export class AuthService extends BaseService {

  @Output() profileNameUpdated = new EventEmitter<any>();

  constructor(http: HttpClient, private router: Router, private tokenService: TokenService) {
    super(http);
  }

  loginUser(user: LoginUser): Observable<LoggedInUser> {
    return super.post('/api/v1/auth/login', user, (json: any) => plainToClass(LoggedInUser, json.data as Object))
      .do((loggedInUser: LoggedInUser) => {
        this.storeLoggedInUser(loggedInUser);
      });
  }

  forgotPassword(forgotPassword: ForgotPassword): Observable<boolean> {
    return super.post('/api/v1/auth/forgotPassword', forgotPassword);
  }

  storeLoggedInUser(loggedInUser: LoggedInUser) {
    this.tokenService.setItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY, loggedInUser.accessToken);
    this.tokenService.setItem(TokenService.AUTH_USER_PROFILE_NAME_KEY, loggedInUser.name);
    this.tokenService.setItem(TokenService.AUTH_USER_ROLE_ID_KEY, loggedInUser.roleId.toString());
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
  }

}
