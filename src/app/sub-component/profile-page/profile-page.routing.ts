import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfilePageComponent } from "./profile-page.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [  
      RouterModule.forChild([    
{ path: 'profile', component: ProfilePageComponent }   ,
{ path: 'editprofile', component: EditProfileComponent }   
  ])],
  exports: [
    RouterModule
  ]
})
export class ProfilePageRouting {
}
