import {Component} from '@angular/core';
import {FormGroup, Validators, FormControl,FormBuilder} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import { ToastrService } from "../services/toastr.service";

declare var jQuery: any;

@Component({
  templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent{

forgotpasswordForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) { 
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],     
    });
  }

  onForgotPassword() {
    if (this.forgotpasswordForm.invalid) {
      return;
    }

    this.authService.forgotPassword(this.forgotpasswordForm.value).subscribe(data => {
      this.toastr.success('You will receive an email shortly with your login information.', 'Success!');
      this.router.navigate(['/']);
    },
    error => {
      this.toastr.error(error, 'Error!');
    });
  }
 
}
