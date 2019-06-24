import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import {RolesEnum} from "../guards/roles-enum";

@Component({
  templateUrl: './app-superadmin.component.html'
})
export class AppSuperAdminComponent implements OnInit {

  profileName: string;
  roleId: number;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.profileName = "UserName";
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
}
