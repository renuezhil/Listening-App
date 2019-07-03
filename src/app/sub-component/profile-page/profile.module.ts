import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from "./profile.service";

import { ProfilePageComponent } from "./profile-page.component";
import { ProfileCardComponent } from "./profile-card.component";
import { ProfilePageRouting } from "./profile-page.routing";
 
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
    imports: [
      // BrowserAnimationsModule,
      ProfilePageRouting,
      FormsModule, ReactiveFormsModule ,
    CommonModule
    
    ],
    declarations: [ProfileCardComponent,ProfilePageComponent, EditProfileComponent],
    providers: [ProfileService],
    exports: [
      ProfilePageComponent ,
      ProfileCardComponent,
      EditProfileComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
 
export class ProfileModule {

}
