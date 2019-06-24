import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { BaseAuthService } from "../services/base-auth-service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HomeService extends BaseAuthService {
  constructor(authHttp: HttpClient, router: Router, toastr: ToastrManager) {
    super(authHttp, router, toastr);
  }

}
