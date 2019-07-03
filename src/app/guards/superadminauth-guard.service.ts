import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { RolesEnum } from "../guards/roles-enum";

@Injectable()
export class SuperAdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Inside super admin AuthGuard#canActivate called');
    return this.checkAuthAndAuthorize();
  }

  checkAuthAndAuthorize(): boolean {
    if(this.authService.isLoggedIn()) return true;
    else
    {
     this.router.navigate(['/']);
      return false;
    }
    // return (this.authService.isLoggedIn()) ? false : true;
    //  if (this.authService.isLoggedIn() && (this.authService.getRoleId() == RolesEnum.SuperAdmin || this.authService.getRoleId() == RolesEnum.Staff)) {
    //     console.log('super admin AuthGuard - user logged in');
    //     return true;
    //  }

    //   // Navigate to the login page with extras
    //   console.log('super admin AuthGuard - user not logged in');
    //   this.router.navigate(['/']);
    //   return false;
    // return true;
  }

   

}
