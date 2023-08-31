import { ITodo } from '@/store/types';

export type DraggedTodo = Pick<ITodo, '_id' | 'order' | 'boardId'>;

export type TodoProps = {
  todo: ITodo;
  boardTodos?: ITodo[]; // for while in d-n-d
  onTodoDrop?: (draggedTodo: DraggedTodo, droppedOnTodo: ITodo) => void;
};

export type ValidationError = {
  error: boolean;
  message: string;
};

export type TodoStatus = 'IDLE' | 'IN_DELETE' | 'IN_EDIT' | 'IN_UPDATE';
