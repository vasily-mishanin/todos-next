export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isVerified?: boolean;
}

export interface IAuthState {
  authState: User;
}
