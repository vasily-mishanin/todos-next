'use client';

import Board from '@/components/Board/Board';
import Spinner from '@/components/Spinner/Spinner';
import { NewBoard } from '@/containers/NewBoard/NewBoard';
import { useGetBoardsQuery } from '@/store/services/boardsApi';
import { IBoard } from '@/store/types';
import toast from 'react-hot-toast';

type KanbanBoardProps = {};

export default function BoardPage({}: KanbanBoardProps) {
  const { isLoading, isFetching, data, error } = useGetBoardsQuery(null);
  const boards = data?.data;

  if (!isLoading && !isFetching && error) {
    console.log({ error });
    toast.error(`Boards fetch failed: ${error}`);
  }

  return (
    <>
      <section className='flex gap-4'>
        {isLoading || (isFetching && <Spinner text='Loading boards ...' />)}
        <div className='flex gap-4 justify-center'>
          {boards &&
            boards.map((board: IBoard) => (
              <Board key={board._id} board={board} />
            ))}
          <NewBoard />
        </div>
      </section>
      <p>- Minimize Todo+NewTodo</p>
      <p>- Add Todos to Boards</p>
      <p>- Add NewTodo to First of the Boards</p>
      <p>- Only Admin can sort todos</p>
    </>
  );
}
