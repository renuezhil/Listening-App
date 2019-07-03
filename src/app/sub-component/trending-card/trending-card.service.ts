import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { BaseAuthService } from "../../services/base-auth-service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';


import { LoggedInUser, LoginUser, ForgotPassword, UserRegsiter } from "../../auth/auth.models";
@Injectable()
export class TrendingcardService extends BaseAuthService {
     @Output() profileNameUpdated = new EventEmitter<any>();
  constructor(authHttp: HttpClient, router: Router, toastr: ToastrManager) {
    super(authHttp, router, toastr);
  }
 

}
