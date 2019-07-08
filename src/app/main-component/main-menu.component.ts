import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import {RolesEnum} from "../guards/roles-enum";

@Component({
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent implements OnInit {

  profileName: string;
  roleId: number;
  currentURL :any;
  constructor(private router: Router, private authService: AuthService) {
    //  this.currentURL = this.router.url;
    //  console.log(this.router.url);
  }

  ngOnInit() {
    this.profileName = localStorage.AUTH_USER_PROFILE_NAME;
    this.roleId = this.authService.getRoleId();

    this.authService.profileNameUpdated.subscribe(
      (updatedProfileName) => {
        this.profileName = updatedProfileName;
      }
    );
  }

  onLogoutUser() {
    this.authService.logout();
    this.router.navigate(['/']);
    
  }

  showOptions(){
    return this.roleId == RolesEnum.SuperAdmin;
  }

  menuItem: any = [
    {
      url: "dashboard",
      label: "Home",
      isActive: true
    }, {
      url: "about",
      label: "About"
    }, {
      url: "contact-us",
      label: "Contact Us"
    },
    {
      url: "profile",
      label: "Profile"
    },
    {
      url: "treding",
      label: "Treding"
    }, {
      url: "login",
      label: "Log out"
    }
  ]
  menuClick(itemlabel)
  {
    alert(itemlabel);
    if(itemlabel == "login") this.logout();
  }
  logout()
  {
    this.authService.logout();
    this.router.navigate(['login']); 
    }
}
