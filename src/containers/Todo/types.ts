import { ITodo } from '@/store/types';

export type TodoProps = {
  todo: ITodo;
};

export type ValidationError = {
  error: boolean;
  message: string;
};

export type TodoStatus = 'IDLE' | 'IN_DELETE' | 'IN_EDIT' | 'IN_UPDATE';
