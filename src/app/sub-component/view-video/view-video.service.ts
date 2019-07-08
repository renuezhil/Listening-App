import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { BaseAuthService } from "../../services/base-auth-service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
 
import { viewvideoDetails } from "./view-video.models";
import { LoggedInUser, LoginUser, ForgotPassword, UserRegsiter } from "../../auth/auth.models";
import { TokenService } from "../../services/token-service";
@Injectable()
export class ViewVideoService extends BaseAuthService {
     @Output() profileNameUpdated = new EventEmitter<any>();
  constructor(authHttp: HttpClient, router: Router, toastr: ToastrManager,private tokenService: TokenService) {
    super(authHttp, router, toastr);
  }
  viewVideoDetails(  id,  pageid): Observable<any> {
 
    return super.get('videos/new')
      .do((videoDetails: any) => {
        console.log(videoDetails);
      });
     
  }

  viewVideoDetailsOld(  id,  pageid): Observable<any> {
 
    return super.get('videos/'+id+"?page="+pageid )
      .do((videoDetails: any) => {
        console.log(videoDetails);
      });
     
  }

}
