import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
export const routes: Routes = [];  
//Service
import { DashboardService } from "./dashboard.service";
import { CommonValidationService } from "../../services/common-validation.service";

@NgModule({
    imports: [
      // BrowserAnimationsModule,
      RouterModule.forChild(routes),
      FormsModule, ReactiveFormsModule ,    
    CommonModule    
    ],
    declarations: [ ],
    providers: [  CommonValidationService,DashboardService],
    exports: [ ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
 
 
  export class DashboardModule { }