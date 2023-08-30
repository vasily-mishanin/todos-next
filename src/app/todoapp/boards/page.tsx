'use client';

import Board from '@/components/Board/Board';
import Spinner from '@/components/Spinner/Spinner';
import { NewBoard } from '@/containers/NewBoard/NewBoard';
import { useGetBoardsQuery } from '@/store/services/boardsApi';
import { useGetTodosQuery } from '@/store/services/todosApi';
import { IBoard, ITodo } from '@/store/types';
import toast from 'react-hot-toast';

type KanbanBoardProps = {};

export default function BoardPage({}: KanbanBoardProps) {
  const {
    isLoading: boardsIsLoading,
    isFetching: boardsIsFetching,
    data: boardsData,
    error: boardsError,
  } = useGetBoardsQuery(null);

  const {
    isLoading: todosIsLoading,
    isFetching: todosIsFetching,
    data: todosData,
    error: todosError,
  } = useGetTodosQuery(null);
  const boards = boardsData?.data;
  const todos = todosData?.data;

  if (!boardsIsLoading && !boardsIsFetching && boardsError) {
    console.log({ boardsError });
    toast.error(`Boards fetch failed: ${boardsError}`);
  }

  if (!todosIsLoading && !todosIsFetching && todosError) {
    console.log({ todosError });
    toast.error(`Todos fetch failed: ${todosError}`);
  }

  return (
    <>
      <section className='flex gap-4'>
        {(boardsIsLoading || todosIsLoading) && (
          <Spinner text='Loading todos and boards ...' />
        )}
        <div className='flex gap-4 justify-center'>
          {boards &&
            boards.map((board: IBoard) => (
              <Board
                key={board._id}
                board={board}
                todos={getBoardsTodos(board._id, todos)}
              />
            ))}
          <NewBoard />
        </div>
      </section>
      <p>- Minimize Todo+NewTodo ✅</p>
      <p>- Add Todos to Boards ✅ </p>
      <p>- Update Board</p>
      <p>- Delete Board if it has no todos</p>
      <p>- Only Admin can sort todos</p>
    </>
  );
}

function getBoardsTodos(boardId?: string, todos?: ITodo[]) {
  if (todos) {
    return todos.filter((todo) => todo.boardId === boardId);
  }
}
