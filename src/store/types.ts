export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isVerified?: boolean;
}

export interface Modal {
  id: string;
  isOpen: boolean;
}

export interface IAuthState {
  user: User;
}
