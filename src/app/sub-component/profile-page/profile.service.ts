import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { BaseAuthService } from "../../services/base-auth-service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
 
import { EditedLoggedInUser } from "./profile.models";
import { LoggedInUser, LoginUser, ForgotPassword, UserRegsiter } from "../../auth/auth.models";
@Injectable()
export class ProfileService extends BaseAuthService {
     @Output() profileNameUpdated = new EventEmitter<any>();
  constructor(authHttp: HttpClient, router: Router, toastr: ToastrManager) {
    super(authHttp, router, toastr);
  }
//   EditUserDetail(user: EditedLoggedInUser): Observable<LoggedInUser> {
 
//     return super.post('login', user, (json: any) => {
//         let loggedInUser: LoggedInUser;
//         loggedInUser.name = json.data.user.first_name + json.data.user.last_name;
//         loggedInUser.accessToken = json.data.token.acess_token;
//         loggedInUser.roleId = 0;
//         loggedInUser.userId= json.data.user.id;
//     })
//       .do((loggedInUser: LoggedInUser) => {
//         this.storeLoggedInUser(loggedInUser);
//       });
     
//   }

}
