import { IBoard, ITodo } from '@/store/types';
import './Board.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { useUpdateBoardMutation } from '@/store/services/boardsApi';
import Spinner from '../Spinner/Spinner';
import { useUpdateTodoMutation } from '@/store/services/todosApi';
import { DraggedTodo } from '@/containers/Todo/types';
import { useState } from 'react';

type BoardProps = {
  board: IBoard;
  todos?: ITodo[];
};

type Inputs = {
  title: string;
};

export default function Board({
  board: { title, order, _id },
  todos,
}: BoardProps) {
  const [updateTodo, todoUpdateResult] = useUpdateTodoMutation();
  const { isLoading, isError, error, data } = todoUpdateResult;
  const [boardTodos, setBoardTodos] = useState(sortTodosByOrder(todos || []));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { title: title },
    mode: 'onChange',
  });

  const [updateBoard, result] = useUpdateBoardMutation();
  const { isLoading: isUpdateBoardLoading } = result;

  const handleUpdateBoard: SubmitHandler<Inputs> = (formData) => {
    updateBoard({ ...formData, order, _id });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    document.getElementById(_id || '')?.classList.add('board__drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    document.getElementById(_id || '')?.classList.remove('board__drag-over');
  };

  const handleTodoOnDrop = (e: React.DragEvent) => {
    const draggedTodoBoardId = e.dataTransfer.getData('boardId');
    const draggedTodoId = e.dataTransfer.getData('todoId');
    document.getElementById(_id || '')?.classList.remove('board__drag-over');
  };

  const handleTodoDrop = (draggedTodo: DraggedTodo, droppedOnTodo: ITodo) => {
    // drag inside the board
    if (draggedTodo.boardId === droppedOnTodo.boardId) {
      console.log('DROP');
      if (draggedTodo.order < droppedOnTodo.order) {
        console.log('from UP');

        const updatedBoardTodos = boardTodos?.map((boardTodo) => {
          if (
            boardTodo.order > droppedOnTodo.order ||
            boardTodo.order < draggedTodo.order
          ) {
            return boardTodo;
          }
          if (boardTodo._id === draggedTodo._id) {
            return { ...boardTodo, order: droppedOnTodo.order };
          }
          return { ...boardTodo, order: boardTodo.order - 1 };
        });
        setBoardTodos(sortTodosByOrder(updatedBoardTodos));
        updatedBoardTodos?.forEach((todo) => {
          updateTodo(todo);
        });
        return;
      }

      if (draggedTodo.order > droppedOnTodo.order) {
        console.log('from DOWN');

        const updatedBoardTodos = boardTodos?.map((boardTodo) => {
          if (
            boardTodo.order < droppedOnTodo.order ||
            boardTodo.order > draggedTodo.order
          ) {
            return boardTodo;
          }
          if (boardTodo._id === draggedTodo._id) {
            return { ...boardTodo, order: droppedOnTodo.order };
          }
          return { ...boardTodo, order: boardTodo.order + 1 };
        });
        setBoardTodos(sortTodosByOrder(updatedBoardTodos));
        updatedBoardTodos?.forEach((todo) => {
          updateTodo(todo);
        });
        return;
      }
    }
  };

  return (
    <section
      id={_id}
      className='board__wrapper'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleTodoOnDrop}
    >
      {isUpdateBoardLoading && <Spinner text='Updating...' />}
      <form
        className='flex items-center justify-between gap-2 mb-4'
        onSubmit={handleSubmit(handleUpdateBoard)}
      >
        <div className='board__title'>
          <span className='text-xs text-red-300 h-4'>
            {errors.title?.message}
          </span>
          <input
            className='board__title_input'
            {...register('title', {
              required: 'Required',
              minLength: { value: 3, message: 'Min. length is 3 characters' },
            })}
            type='text'
            placeholder='Board title'
          />
        </div>
        <button
          className='board__add-btn '
          type='submit'
          disabled={!!errors.title}
        >
          <ArrowPathIcon />
        </button>
      </form>
      <div className='flex flex-col gap-1 items-center'>
        {boardTodos &&
          boardTodos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              boardTodos={boardTodos}
              onTodoDrop={handleTodoDrop}
            />
          ))}
        <NewTodo boardId={_id} index={todos?.length || 0} />
      </div>
    </section>
  );
}

function sortTodosByOrder(todos: ITodo[]) {
  return todos?.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  });
}
