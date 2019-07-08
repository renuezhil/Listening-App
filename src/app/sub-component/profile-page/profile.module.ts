import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfilePageRouting } from "./profile-page.routing";

//Service
import { ProfileService } from "./profile.service";
import { CommonValidationService } from "../../services/common-validation.service";


import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
    imports: [
      // BrowserAnimationsModule,
      ProfilePageRouting,
      FormsModule, ReactiveFormsModule ,
    
    CommonModule
    
    ],
    declarations: [ EditProfileComponent],
    providers: [  CommonValidationService,ProfileService],
    exports: [
      
      EditProfileComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
 
export class ProfileModule {

}
