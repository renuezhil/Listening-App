import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";

const noTransform = (json: any) => json;

export abstract class BaseService {


  constructor(protected httpClient: HttpClient) { }


  get(url: string, transform: (json: any) => any = noTransform): Observable<any> {

    var headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.get(environment.url + url, { headers }).pipe(map(this.extractData), catchError(this.handleError));

    // .map(transform)
    // .catch(this.handleError);
  }

  post(url: string, body: any, transform: (json: any) => any = noTransform): Observable<any> {

    var headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post(environment.url + url, body, { headers }).pipe(map(this.extractData), map(transform), catchError(this.handleError));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  handleError(httpErrorResponse) {
    let errorMessage = '';
    if (httpErrorResponse instanceof HttpErrorResponse) {
      // client-side error
      // errorMessage = httpErrorResponse.error.error || httpErrorResponse.error.message;
      errorMessage = httpErrorResponse.error.message || httpErrorResponse.error.error;
    } else {
      // server-side error
      errorMessage = `Error Code: ${httpErrorResponse.status}\nMessage: ${httpErrorResponse.error.error}`;
    }

    return Observable.throw(errorMessage);
  }

  private setupHeader(): HttpHeaders {
    var headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    
    return headers;    
  }
}
