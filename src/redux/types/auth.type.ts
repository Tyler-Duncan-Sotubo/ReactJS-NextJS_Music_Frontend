export type AuthState = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  access_token: string;
  passwordResetStatus: string;
  passwordResetError: string | null;
  refresh_token: string;
  registerStatus: string;
  registerError: string | null;
  loginStatus: string;
  loginError: string | null;
  emailVerificationStatus: string;
  emailVerificationError: string;
};

export type IUser = {
  sub: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  shouldRemember: boolean;
};
