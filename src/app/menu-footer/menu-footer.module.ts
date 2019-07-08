import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FooterComponentComponent } from './footer-component/footer-component.component';

import { MenuBarComponent } from './menu-bar/menu-bar.component';

import { CommonModule } from '@angular/common';

import {MenuFooterService} from "./menu-footer.service";
 
@NgModule({
    imports: [
        CommonModule,
        RouterModule         
      ],
      declarations: [
        MenuBarComponent,FooterComponentComponent 
      ],
      exports: [
        MenuBarComponent,FooterComponentComponent 
      ],
        providers : [MenuFooterService]
   
  })
  export class MenuFooterModule { }