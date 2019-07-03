import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrendingcardService } from "./trending-card.service";
import {TrendingcardRouting} from "./trending-card.routing";

import { TrendingCardComponent } from "./trending-card.component";
 

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
    imports: [
      // BrowserAnimationsModule,
      TrendingcardRouting,
      CommonModule
      
    ],
    declarations: [TrendingCardComponent],
    providers: [TrendingcardService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
 
export class TrendingModule {

}
