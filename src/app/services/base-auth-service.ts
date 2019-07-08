import {
  Headers,
  RequestOptions,
  Response,
  ResponseContentType
} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { AuthHttp, JwtHelper } from "angular2-jwt/angular2-jwt";
import { TokenService } from "./token-service";

import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectorRef
} from "@angular/core";
import * as moment from "moment/moment";

import { plainToClass } from "class-transformer";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { map, catchError, tap } from 'rxjs/operators';

const noTransform = (json: any) => json.data;
// var jwtHelper: JwtHelper = new JwtHelper();
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

var token = localStorage.getItem('AUTH_USER_ACCESS_TOKEN');
 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${token}`
  })
};

export abstract class BaseAuthService {


  constructor(
    protected authHttp: HttpClient,
    protected router: Router,
    protected toastr: ToastrManager
  ) { }

 
  accessTokenExpired(): boolean {
 
    return jwtHelper.isTokenExpired(token);
  }

  refreshSessionToken() {
    var userId = localStorage.getItem("AUTH_USER_OTHER_NAME");
    this.refreshToken(+userId);
  }

  clearStorageAndRedirectUser() {
    localStorage.removeItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY);
    localStorage.removeItem(TokenService.AUTH_USER_PROFILE_NAME_KEY);
    localStorage.removeItem(TokenService.AUTH_USER_PROFILE_OTHER_KEY);
    localStorage.removeItem(TokenService.AUTH_USER_EMAIL_ID_KEY);
    this.toastr.errorToastr(
      "Your session is expired. Please re-login to renew your session.",
      "Error!"
    );
    this.router.navigate(["/login"]);
  }

  get(url: string, transform: (json: any) => any = noTransform): Observable<any> {
    if (!this.accessTokenExpired()) {
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');

      return this.authHttp.get(environment.url + url, httpOptions)
        .pipe(map(this.extractData), map(transform), catchError(this.handleError));

      // .map(this.extractObject)
      // .map(transform)
      // .catch(this.handleError);
    }
    else {
      this.clearStorageAndRedirectUser();
    }
  }

  post(url: string, body: any, transform: (json: any) => any = noTransform): Observable<any> {
    if (!this.accessTokenExpired()) {
      // var token = localStorage.getItem('AUTH_USER_ACCESS_TOKEN')
      // var headers = new HttpHeaders();
      // headers.set('Content-Type', 'application/json; charset=utf-8');
      // headers.set('Authorization' , `Bearer ${token}`);
      return this.authHttp.post(environment.url + url, body, httpOptions)
        .pipe(map(this.extractData), map(transform), catchError(this.handleError));

      // .map(this.extractObject)
      //   .map(transform)
      //   .catch(this.handleError);
    } else {
      this.clearStorageAndRedirectUser();
    }
  }

  put(url: string, body: any, transform: (json: any) => any = noTransform): Observable<any> {
    if (!this.accessTokenExpired()) {
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');

      return this.authHttp.put(environment.url + url, body, { headers })
        .pipe(map(this.extractData), map(transform), catchError(this.handleError));
      // .map(this.extractObject)
      // .map(transform)
      // .catch(this.handleError);
    } else {
      this.clearStorageAndRedirectUser();
    }
  }

  delete(url: string, transform: (json: any) => any = noTransform) {
    if (!this.accessTokenExpired()) {
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');

      // return this.authHttp.delete(environment.url + url, { headers })
      //   .map(this.extractObject)
      //   .map(transform)
      //   .catch(this.handleError);

        return this.authHttp.delete(environment.url + url, { headers })
        .pipe(map(this.extractData), map(transform), catchError(this.handleError));
    } else {
      this.clearStorageAndRedirectUser();
    }
  }

  download(url: string, contentType: string) {
    // if (!this.accessTokenExpired()) {
    //   var headers = new HttpHeaders();
    //   headers.set('Content-Type', 'application/json; charset=utf-8');
    //   headers.set('Accept', contentType);

    //   let options = new RequestOptions({ headers: headers });
    //   options.responseType = ResponseContentType.Blob;

    //   return this.authHttp.get(url,options)
    //     .map((res: Response) => new Blob([res.blob()], {type: contentType}))
    //     .catch(this.handleError);
    // } else {
    //   this.clearStorageAndRedirectUser();
    // }
  }

  refreshTokenAPI(
    url: string,
    transform: (json: any) => any = noTransform
  ): Observable<any> {
    var headers = new HttpHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");

    return this.authHttp
      .get(url, { headers })
      .map(this.extractObject)
      .map(transform)
      .catch(this.handleError);
  }

  refreshToken(userId: number) {
    return this.refreshTokenAPI(
      "/api/v1/auth/refreshToken?userId=" + userId,
      (json: any) => plainToClass(String, json.data as Object)
    ).subscribe(
      data => {
        localStorage.setItem("AUTH_USER_ACCESS_TOKEN", data);
      },
      err => console.log(err),
      () => console.log("Token Refreshed..")
    );
  }

  private extractObject(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json();
  }

  // // TODO: Send error to backend
  // private handleError(error: any) {
  //   // In a real world app, we might send the error to remote logging infrastructure
  //   let errMsg = error.json() || {error: 'Server error'};
  //   return Observable.throw(errMsg.error);
  // }


  private extractData(res: Response) {
    let body = res;
    console.log(body);
    return body || {};
  }

  handleError(httpErrorResponse) {
    let errorMessage = '';
    console.log(httpErrorResponse);    
    if (httpErrorResponse instanceof HttpErrorResponse) {
      // client-side error
      errorMessage = httpErrorResponse.error.message || httpErrorResponse.error.error;
    } else {
      // server-side error
      errorMessage = `Error Code: ${httpErrorResponse.status}\nMessage: ${httpErrorResponse.error.error}`;
    }

    return Observable.throw(errorMessage);
  }

  /*fileUpload(url: string, body: any, transform: (json: any) => any = noTransform): Observable<any> {
   let headers = new HttpHeaders();
   headers.set('Content-Type', 'multipart/form-data');
   headers.set('Accept', 'application/json');
   let options = new RequestOptions({ headers: headers });

   return this.authHttp.post(url, body, options)
   .map(this.extractObject)
   .map(transform)
   .catch(this.handleError);
   }*/
}
function setHeaders()
{
  var headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Authorization' , `Bearer ${this.token}`) 
   
}