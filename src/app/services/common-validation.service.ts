import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { RolesEnum } from "../guards/roles-enum";

@Injectable()
export class CommonValidationService   {

  constructor(private authService: AuthService, private router: Router) {
  }

  

  checkAuthAndAuthorize(): boolean {
    if(this.authService.isLoggedIn()) return true;
    else
    {
     this.router.navigate(['/']);
      return false;
    }
    
  }

  checkPassword(varpassword ,varconfirmpassword)
  {
    if(varpassword != undefined && varconfirmpassword != undefined)
    {
if(varpassword == varconfirmpassword) return true;
else return false;
    }
    else return false;

  }
  refresh(url) {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() =>
        this.router.navigate([url]));
}
logoutservice()
{
  this.authService.logout();
}

}
