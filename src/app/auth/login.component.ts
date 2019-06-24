import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { ValidationService } from "../services/validation-service";
import { RolesEnum } from "../guards/roles-enum";
import { ToastrService } from "../services/toastr.service";

import { Validate } from "../utilities/data-validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.loginPasswordValidator]]
    });
  }

  ngOnInit() {

  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.router.navigate(['/super-admin/home']);

    // this.authService.loginUser(this.loginForm.value).subscribe(data => {
    //   console.log(data)
    //   if (data.roleId == RolesEnum.Admin) {
    //     this.authService.navigateUser(data);
    //     // this.toastr.error('Sales Person login access is restricted.', 'Error!');
    //   } else {
    //     this.toastr.success('Login Success.', 'Success!');
    //     this.authService.navigateUser(data);
    //   }
    // },
    //   error => this.toastr.error(error, "Error!"));
  }
}
