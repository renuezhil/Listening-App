export class EditedLoggedInUser {
    userId: number;
    firstname: string;
    lastname:string;
    accessToken: string;
    roleId: number;
    password:string;

  }

  export class ResetPasswordUser
  {
    email :string;
    password :string;
    newpassword :string;
  }