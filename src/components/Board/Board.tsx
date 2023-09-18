import { IBoard, IDraggedBoard, ITodo, ModalTypes } from '@/store/types';
import './Board.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArchiveBoxIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from '@/store/services/boardsApi';
import Spinner from '../Spinner/Spinner';
import { useUpdateTodoMutation } from '@/store/services/todosApi';
import { DraggedTodo } from '@/containers/Todo/types';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { setOpenModal } from '@/store/modalSlice';
import { useAppSelector } from '@/store/hooks';
import { CommonList } from '../common/CommonList';

type BoardProps = {
  title: string;
  order: number;
  _id: string;
  todos?: ITodo[];
  onBoardDrop: (draggedBoard: IDraggedBoard) => void;
};

type Inputs = {
  title: string;
};

export default function Board({
  title,
  order,
  _id: boardId,
  todos,
  onBoardDrop,
}: BoardProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [updateTodo, todoUpdateResult] = useUpdateTodoMutation();
  const { isLoading, isError, error, data } = todoUpdateResult;
  const [deleteBoard, deleteBoardResult] = useDeleteBoardMutation();
  const [boardTodos, setBoardTodos] = useState(
    getSortedBoardTodos(boardId, todos || [])
  );
  const [currentTitle, setCurrentTitle] = useState(title);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // check if new todos the same as now
    const newBoardTodos = getSortedBoardTodos(boardId, todos || []);
    if (newBoardTodos.length !== boardTodos.length) {
      setBoardTodos(newBoardTodos);
    }
  }, [todos]);

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
    updateBoard({ ...formData, order, _id: boardId });
  };

  // DnD

  const handleBoardDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('item', 'BOARD');
    e.dataTransfer.setData('boardId', boardId);
    e.dataTransfer.setData('boardOrder', order.toString());
    console.log(
      'Board Drag Start',
      e.dataTransfer.getData('boardId'),
      e.dataTransfer.getData('boardOrder')
    );
    document.getElementById(boardId)?.classList.add('board__dimmed');
  };

  const handleBoardDragEnd = (e: React.DragEvent) => {
    document
      .querySelectorAll('.board__wrapper')
      .forEach((el) =>
        el.classList.remove('board__dimmed', 'board__drag-over')
      );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    document.getElementById(boardId)?.classList.add('board__drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    document
      .getElementById(boardId || '')
      ?.classList.remove('board__drag-over');
  };

  const handleOnBoardDrop = (e: React.DragEvent) => {
    const draggedItem = e.dataTransfer.getData('item');
    if (draggedItem === 'BOARD') {
      const draggedBoardId = e.dataTransfer.getData('boardId');
      const draggedBoardOrder = +e.dataTransfer.getData('boardOrder');
      onBoardDrop({
        draggedBoardId,
        draggedBoardOrder,
        droppedOnBoardId: boardId,
        droppedOnBoardOrder: order,
      });
      return;
    }
    const draggedTodoBoardId = e.dataTransfer.getData('boardId');
    const draggedTodoId = e.dataTransfer.getData('todoId');
    const draggedTodoOrder = parseInt(e.dataTransfer.getData('todoOrder'));
    // if dropped on Todo card or dropped on the same board
    const targetElement = e.target as EventTarget & HTMLElement;
    if (
      targetElement.closest('.todo-wrapper') ||
      draggedTodoBoardId === boardId
    ) {
      return;
    }
    console.log('ON BOARD');

    document
      .getElementById(boardId || '')
      ?.classList.remove('board__drag-over');

    const draggedTodo = {
      _id: draggedTodoId,
      order: draggedTodoOrder,
      boardId: draggedTodoBoardId,
    };

    addTodoFromAnotherBoard(draggedTodo);
  };

  const handleTodoOnTodoDrop = (
    draggedTodo: DraggedTodo,
    droppedOnTodo: ITodo
  ) => {
    // drop inside the same board
    console.log('ON TODO');
    if (draggedTodo.boardId === droppedOnTodo.boardId) {
      sortTodosInsideBoard(draggedTodo, droppedOnTodo);
      return;
    }
    // drop todo from another board
    addTodoFromAnotherBoard(draggedTodo, droppedOnTodo);
  };

  const sortTodosInsideBoard = (
    draggedTodo: DraggedTodo,
    droppedOnTodo: ITodo
  ) => {
    if (draggedTodo.order <= droppedOnTodo.order) {
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
  };

  const addTodoFromAnotherBoard = async (
    draggedTodo: DraggedTodo,
    droppedOnTodo?: ITodo
  ) => {
    console.log('DROP - addTodoFromAnotherBoard');
    const addedTodo = todos?.find((todo) => todo._id === draggedTodo._id);
    let updatedBoardTodos = addedTodo
      ? [
          ...boardTodos,
          { ...addedTodo, boardId: boardId, order: boardTodos.length },
        ]
      : [...boardTodos];
    // if todo dropped on certain Todo card
    if (droppedOnTodo) {
      updatedBoardTodos = updatedBoardTodos.map((boardTodo, index) => {
        if (index <= droppedOnTodo.order) {
          return boardTodo;
        }
        if (boardTodo._id === draggedTodo._id) {
          return { ...boardTodo, order: droppedOnTodo.order + 1 };
        }
        return { ...boardTodo, order: index + 1 };
      });
    }
    for (let todo of updatedBoardTodos) {
      await updateTodo(todo);
    }
    // refresh source board
    if (draggedTodo.boardId && todos && draggedTodo._id) {
      const refreshedOrderTodos = refreshOrderOfTodosOnSourceBoard(
        draggedTodo.boardId,
        todos,
        draggedTodo._id
      );
      console.log({ refreshedOrderTodos });

      //setBoardTodos(refreshedOrderTodos);
      for (let todo of refreshedOrderTodos) {
        await updateTodo(todo);
      }
    }
  };

  const handleDeleteBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (boardTodos.length !== 0) {
      return;
    }
    dispatch(
      setOpenModal({
        id: ModalTypes.DELETE_BOARD,
        isOpen: true,
        data: { _id: boardId },
      })
    );
  };

  const refreshOrderOfTodosOnSourceBoard = (
    sourceBoardId: string,
    todos: ITodo[],
    draggedTodoId: string
  ) => {
    const todosWithoutDraggedOne = todos.filter(
      (todo) => todo._id !== draggedTodoId && todo.boardId === sourceBoardId
    );

    const reorderedTodos = todosWithoutDraggedOne.map((todo, ind) => ({
      ...todo,
      order: ind,
    }));
    return reorderedTodos;
  };

  return (
    <section
      id={boardId}
      draggable={user.isAdmin}
      className='board__wrapper'
      onDragStart={handleBoardDragStart}
      onDragEnd={handleBoardDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleOnBoardDrop}
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
            onChange={(e) => setCurrentTitle(e.target.value.trim())}
          />
        </div>

        <Button
          type='submit'
          btnType='submit'
          disabled={currentTitle === title}
          isActive={currentTitle !== title}
        >
          <ArrowPathIcon />
        </Button>

        <Button
          type='button'
          btnType='delete'
          clickHandler={handleDeleteBoard}
          disabled={boardTodos.length > 0}
        >
          <ArchiveBoxIcon />
        </Button>
      </form>
      <div className='flex flex-col gap-1 items-center'>
        {boardTodos && (
          <CommonList
            items={boardTodos}
            itemComponent={Todo}
            resourceName='todo'
            handler={{
              handlerName: 'onTodoDrop',
              handlerBody: handleTodoOnTodoDrop,
            }}
            listStyleClasses='flex flex-col gap-1 items-center'
          >
            <NewTodo boardId={boardId} index={todos?.length || 0} />
          </CommonList>
        )}
      </div>
    </section>
  );
}

// boardTodos.map((todo) => (
//   <Todo
//     key={todo._id}
//     todo={todo}
//     onTodoDrop={handleTodoOnTodoDrop}
//   />
// ))

function sortTodosByOrder(todos: ITodo[]) {
  return todos?.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  });
}

function getSortedBoardTodos(boardId: string, todos: ITodo[]) {
  const boardTodos = todos.filter((todo) => todo.boardId === boardId);
  return sortTodosByOrder(boardTodos);
}
