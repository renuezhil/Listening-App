
export class LoginUser {
  email: string;
  password: string;
}

export class LoggedInUser {
  userId: number;
  name: string;
  accessToken: string;
  organizationId: number;
  organizationName: string;
  roleId: number;
  totalCompanyAssigned: number;
}

export class ForgotPassword {
  email: string;
}