import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TrendingCardComponent } from "./trending-card.component";
 
@NgModule({
  imports: [  
      RouterModule.forChild([    
{ path: 'trending', component: TrendingCardComponent }   
  ])],
  exports: [
    RouterModule
  ]
})
export class TrendingcardRouting {
}
