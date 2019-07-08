import { Component, OnInit } from '@angular/core';
import { Router, Routes } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

import {TrendingModule} from "../../sub-component/trending-card/trending-card.module";
import { TrendingCardComponent } from "../../sub-component/trending-card/trending-card.component";
 
import { EditProfileComponent } from  "../../sub-component/profile-page/edit-profile/edit-profile.component";
import {ProfileModule} from "../../sub-component/profile-page/profile.module";

import { DashboardComponentComponent } from '../../sub-component/dashboard-component/dashboard-component.component';
import {DashboardModule} from "../../sub-component/dashboard-component/dashboard.module";
 
import { ToastrService } from "../../services/toastr.service";
 import {MenuFooterService} from "../menu-footer.service";
export const routes: Routes = [
 
  {  path: '',    redirectTo: 'login',    pathMatch: 'full'},
  {
    path: 'trending',
    component: TrendingCardComponent,   
    
    children: [
        {
      path: '',
      loadChildren: './sub-component/trending-card/trending-card.module#TrendingModule'
  }]  },
  {
    path: 'profile',
    component: EditProfileComponent,   
    
    children: [
        {
      path: '',
      loadChildren: '../../sub-component/profile-page/profile.module#ProfileModule'
  }]  },
  {
    path: 'dashboard',
    component: DashboardComponentComponent,   
    
    children: [
        {
      path: '',
      loadChildren: '../../sub-component/dashboard-component/dashboard.module#DashboardModule'
  }]  }
 
  
];

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  menuItems: any[];
  constructor(private menuService : MenuFooterService,private router: Router,private authService: AuthService,private toastr: ToastrService) {

  }

  ngOnInit() {
    this.getvideoCategory();
  }
  videoCategoryList: any;
  getvideoCategory() {
    this.menuService.getVideoCategoryDetails().subscribe(
      (data) => {
        this.createCategoryData( data);
      },
      err => this.toastr.error(err, "Error!"))
    error => this.toastr.error(error, "Error!")

  }

  createCategoryData(tempCategory) {
    var rowData: any[] = [];
    var RefData = [];
   
    for (var i = 0; i <  tempCategory.data.length; i++) {
      rowData.push({
        rowid: i + 1,
        current_page:  tempCategory.current_page,
        total: tempCategory.total,
        description: tempCategory.data[i].description,
        id: tempCategory.data[i].id,
        title: tempCategory.data[i].title,     
       });
    }
    this.videoCategoryList = rowData;
    // console.log(this.videoCategoryList);
  }


  test: string = "as";
  menuItem: any = [
    {
      url: "home",
      label: "Home",
      isActive: true
    }, {
      url: "about",
      label: "About"
    }, {
      url: "contact-us",
      label: "Contact Us"
    }, {
      url: "login",
      label: "Log out"
    },
    {
      url: "profile",
      label: "Profile"
    },
    {
      url: "treding",
      label: "Treding"
    }
    ,
    {
      url: "viewvideo",
      label: "videos"
    }
  ]
  onLogoutUser() {
    this.authService.logout();
    this.router.navigate(['/']);
    
  }
}
