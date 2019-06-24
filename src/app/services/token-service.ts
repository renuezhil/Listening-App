import {Injectable} from "@angular/core";

@Injectable()
export class TokenService {

  public static AUTH_USER_ACCESS_TOKEN_KEY: string = "AUTH_USER_ACCESS_TOKEN";
  public static AUTH_USER_PROFILE_NAME_KEY: string = "AUTH_USER_PROFILE_NAME";
  public static AUTH_USER_PROFILE_OTHER_KEY: string = "AUTH_USER_OTHER_NAME";
  public static AUTH_USER_ROLE_ID_KEY: string = "AUTH_USER_ROLE_ID";
  public static PAGE_URL: string = "PAGE_URL";

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  setItem(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getAuthorizationHeader() : {} {
    return { "Authorization": "Bearer " + this.getItem(TokenService.AUTH_USER_ACCESS_TOKEN_KEY)}
  }
}
