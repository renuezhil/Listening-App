import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  , NgForm} from "@angular/forms";

import { AuthService } from "../auth.service";
import { ValidationService } from "../../services/validation-service";
import { RolesEnum } from "../../guards/roles-enum";
import { ToastrService } from "../../services/toastr.service";
import { RouterModule,Router } from "@angular/router";
import { Validate } from "../../utilities/data-validator";
// import {CommonValidationService} from "../../guards/common-validation.service";
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {
  newadd: any = {};
  

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService ) {
    
  }
  ngOnInit() {
    if(!this.authService.isAllowLoginMenu())
    this.router.navigate(['dashboard']); 
    this.newadd.isactive=false;

  }
  
  onSubmit(form:NgForm) {
   
console.log(this.newadd)
this.newadd.plantype ="2";
this.newadd.accountname = this.newadd.firstname+""+this.newadd.lastname;
this.authService.userregistartion(this.newadd).subscribe(data => {
  this.toastr.success(this.newadd.firstname +" details successfully register", 'Success!');
  this.router.navigate(['/login']);
},
error => {
  this.toastr.error(error, 'Error!');
});
}
}
