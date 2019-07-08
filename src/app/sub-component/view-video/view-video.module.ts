import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 
import { ViewVideoComponent } from './view-video.component';
 
//Service
import { ViewVideoService } from "./view-video.service";
import { CommonValidationService } from "../../services/common-validation.service";
import {ViewVideoRouting} from "./view-video.routing";

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
    imports: [
      // BrowserAnimationsModule,
      ViewVideoRouting,
      FormsModule, ReactiveFormsModule ,    
    CommonModule    
    ],
    declarations: [ ViewVideoComponent],
    providers: [  CommonValidationService,ViewVideoService],
    exports: [      
        ViewVideoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
 
export class ViewVideoModule {

}
