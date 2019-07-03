
export class LoginUser {
  email: string;
  password: string;
}

export class LoggedInUser {
  userId: number;
  name: string;
  accessToken: string;  
  roleId: number;
  
}

export class ForgotPassword {
  email: string;
}
export class UserRegsiter {
  firstname : string ;
  lastname : string ;
  accountname: string ;
  plantype : number ;
  email : string ;
  password : string;
}