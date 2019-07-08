import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
 
import { ViewVideoComponent } from './view-video.component';
@NgModule({
  imports: [  
      RouterModule.forChild([   
 
{ path: 'viewvideo/:id', component: ViewVideoComponent }   
  ])],
  exports: [
    RouterModule
  ]
})
export class ViewVideoRouting {
}
