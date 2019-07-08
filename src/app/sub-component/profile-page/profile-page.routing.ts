import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
 
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [  
      RouterModule.forChild([    
// { path: 'profile', component: ProfilePageComponent }   ,
{ path: 'profile', component: EditProfileComponent }   
  ])],
  exports: [
    RouterModule
  ]
})
export class ProfilePageRouting {
}
