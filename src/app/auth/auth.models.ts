
export class LoginUser {
  email: string;
  password: string;
}

export class LoggedInUser { 
  name: string;
  accessToken: string;  
  emailid :String;
  roleId: number;  
  userId: number;
  data:any;
  user:any;
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