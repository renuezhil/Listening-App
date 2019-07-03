import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  , NgForm} from "@angular/forms";
import { ToastrService } from "../../services/toastr.service";
import { RouterModule,Router } from "@angular/router";

// import {CommonValidationService} from "../../guards/common-validation.service";
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html' 
})
export class ProfilePageComponent implements OnInit {
  newadd: any = {};
  constructor(private formBuilder: FormBuilder, private router: Router,   private toastr: ToastrService) { }

  ngOnInit() {
  }

  userdetailSave(form:NgForm)
  {
    console.log(this.newadd)
  
  }
  passworddetailSave(form:NgForm)
  {
    console.log(this.newadd)
  }
}
