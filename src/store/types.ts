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
  id: string;
  isOpen: boolean;
  data?: Record<any, any>;
}

export interface IAuthState {
  user: User;
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
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface UsersResponse {
  message: string;
  success: boolean;
  data: User[];
}
