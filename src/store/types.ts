export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isVerified?: boolean;
}

export interface ITodo {
  title: string;
  details: string;
  userId: string;
  _id?: string;
  done: boolean;
  by: string;
}

export interface Modal {
  id: ModalTypes;
  isOpen: boolean;
  data?: Record<any, any>;
}

export interface IAuthState {
  user: User;
  loading: LoadingState;
  error: string;
}

export interface IPostTodoResult {
  message: string;
  success: boolean;
  todo: ITodo;
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface UsersState {
  users: User[];
  error: string;
  loading: LoadingState;
}

export interface UsersResponse {
  message: string;
  success: boolean;
  data: User[];
}

export interface ILoginCreds {
  email: string;
  password: string;
  username?: string;
}

export interface LoginResponse {
  data: {
    message: string;
    success: boolean;
    user: User & { _id: string };
  };
}

export interface MeResponse {
  data: {
    data: User & { _id: string };
    message: string;
    success: boolean;
  };
}

export interface LogoutResponse {
  data: {
    message?: string;
    success?: boolean;
    error?: any;
  };
}

export interface VerifyEmailResponse {
  data: {
    message?: string;
    status?: number;
    error?: any;
  };
}

export enum ModalTypes {
  NONE = 'NONE',
  DELETE_TODO = 'DELETE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
}
