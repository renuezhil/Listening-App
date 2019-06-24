import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login.component";

import { ProfilePageComponent } from './profile-page/profile-page.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent }
];

export const routing = RouterModule.forRoot(routes);
