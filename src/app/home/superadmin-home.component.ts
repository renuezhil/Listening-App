import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { HomeService } from "./home.service";
import { ToastrManager } from 'ng6-toastr-notifications';

import { ToastrService } from '../services/toastr.service';

@Component({
  templateUrl: './superadmin-home.component.html',
  styleUrls: ['./home.component.scss']
})
export class SuperAdminHomeComponent {

  constructor(private homeService: HomeService, private router: Router) {

  }

  goToUserPage() {
    this.router.navigate(['/super-admin/dicom']);
  }

  goToOrganizationPage() {
    this.router.navigate(['/super-admin/organization']);
  }
}
