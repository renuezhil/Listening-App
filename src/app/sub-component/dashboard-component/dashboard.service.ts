import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { BaseAuthService } from "../../services/base-auth-service";
import { Router } from "@angular/router";
 
import { LoggedInUser, LoginUser, ForgotPassword, UserRegsiter } from "../../auth/auth.models";
  import {videosDetails} from "../dashboard-component/dashboard.models";
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class DashboardService extends BaseAuthService {
     @Output() profileNameUpdated = new EventEmitter<any>();
  constructor(authHttp: HttpClient, router: Router, toastr: ToastrManager) {
    super(authHttp, router, toastr);
  }
  returnDataListst   :any ; 
  getdashboardTrendingVideos(): Observable<any> {  
     return super.get('videos/trending' )     //, (json: any) =>   json.data )     
       .do((videoObj: any) => {  
        // console.log(videoObj)   
       }) ;  
   }
// 
   getdashboardNewVideos(): Observable<any> {    
    return super.get('videos/new' )     //, (json: any) =>   json.data )     
    .do((videoObj: any) => {  
     console.log(videoObj)   
    })  
  }

  
  getdashboardWatchedVideos(): Observable<any> {    
    return super.get('videos/watched/38' )     //, (json: any) =>   json.data )     
       .do((videoObj: any) => {  
        // console.log(videoObj)   
       }) 
  }

   getdashboardMostWatchedVideos(): Observable<any> {  
       return super.get('videos/most-watched' )     //, (json: any) =>   json.data )     
       .do((videoObj: any) => {  
        // console.log(videoObj)   
       }) 

   } 

   getVideoCategoryDetails(): Observable<any> {
   
    return super.get('categories' )     //, (json: any) =>   json.data )     
       .do((videoObj: any) => {  
        // console.log(videoObj)  
       
       }) 
 
      
   }

}