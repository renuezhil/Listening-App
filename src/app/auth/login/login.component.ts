import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  , NgForm} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
 
import { ToastrService } from "../../services/toastr.service";

// import { Validate } from "../utilities/data-validator";
// import { ValidationService } from "../services/validation-service";
// import { RolesEnum } from "../guards/roles-enum";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService ) {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, ValidationService.emailValidator]],
    //   password: ['', [Validators.required ]]
    // });
  }

  ngOnInit() {
    if(!this.authService.isLoggedIn())
    this.router.navigate(['login']); 
    else  this.router.navigate(['dashboard']); 
 

  }

  onLogin(form : NgForm) {
    this.authService.logout();
   
     this.authService.loginUser( form.value).subscribe(data => {
      console.log(data)
      this.toastr.success('Welcome ' + data.name, 'Success!');
      this.router.navigate(['dashboard']); 
      // if (data.roleId == RolesEnum.Admin) {
      //   this.authService.navigateUser(data);      
      // } else {
      //   this.toastr.success('Login Success.', 'Success!');
      //   this.authService.navigateUser(data);
      // }
    },
      error => this.toastr.error(error, "Error!"));

   }
}
