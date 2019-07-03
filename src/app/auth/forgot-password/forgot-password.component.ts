import {Component} from '@angular/core';
import {FormGroup, Validators, FormControl,FormBuilder, NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import { ToastrService } from "../../services/toastr.service";
import { RouterModule,Router } from "@angular/router";
 
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
  ngOnInit() {
    if(!this.authService.isAllowLoginMenu())
    this.router.navigate(['dashboard']); 
 

  }
  onForgotPassword(form :NgForm) {
  // this.toastr.success( form.value.email, 'Success!');
    this.authService.forgotPassword(form.value).subscribe(data => {
      this.toastr.success('You will receive an email shortly with your login information.', 'Success!');
      this.router.navigate(['/login']);
    },
    error => {
      this.toastr.error(error, 'Error!');
    });
  }
 
}
