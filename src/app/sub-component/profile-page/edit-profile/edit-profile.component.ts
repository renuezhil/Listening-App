import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  , NgForm} from "@angular/forms";
import { ToastrService } from "../../../services/toastr.service";
import { RouterModule,Router } from "@angular/router";
import { CommonValidationService } from "../../../services/common-validation.service";
import {ProfileService} from "../profile.service";
import { LoggedInUser, LoginUser, ForgotPassword, UserRegsiter } from "../../../auth/auth.models";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  newadd: any = {};
  constructor(private apiservice : ProfileService,private commonservice: CommonValidationService,private formBuilder: FormBuilder, private router: Router,   private toastr: ToastrService) { }

  ngOnInit() {
  }

  userdetailSave(form:NgForm)
  {
    console.log(this.newadd)
    this.newadd.accountname = this.newadd.firstname+""+this.newadd.lastname;
    this.apiservice.EditUserDetail(this.newadd).subscribe(data => {
      console.log(data)
      this.router.navigate(['super-admin/profile-home']); 
     
    },
      error => this.toastr.error(error, "Error!"));

  }
  passworddetailSave(form:NgForm)
  {
    console.log(this.newadd)
    console.log(this.newadd)

    this.newadd.email = localStorage.AUTH_USER_EMAIL_ID;
    this.apiservice.resetPassword(this.newadd).subscribe(data => {
      console.log(data)
      this.toastr.success('Password Change Successfully', 'Success!');
      this.commonservice.logoutservice();
      this.router.navigate(['login']);
     
     
    },
      error => this.toastr.error(error, "Error!"));

  }
}
