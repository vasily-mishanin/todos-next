'use client';

import Board from '@/components/Board/Board';
import Spinner from '@/components/Spinner/Spinner';
import { NewBoard } from '@/containers/NewBoard/NewBoard';
import {
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from '@/store/services/boardsApi';
import { useGetTodosQuery } from '@/store/services/todosApi';
import { IBoard, IDraggedBoard, ITodo } from '@/store/types';
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

  const [updateBoard, result] = useUpdateBoardMutation();
  const sortedBoards = [...(boardsData?.data || [])].sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  });

  const todos = todosData?.data.filter((todo) => todo.order >= 0); // TODO  - remove filter later

  if (!boardsIsLoading && !boardsIsFetching && boardsError) {
    console.log({ boardsError });
    toast.error(`Boards fetch failed: ${boardsError}`);
  }

  if (!todosIsLoading && !todosIsFetching && todosError) {
    console.log({ todosError });
    toast.error(`Todos fetch failed: ${todosError}`);
  }

  const handleOnBoardDrop = (draggedBoard: IDraggedBoard) => {
    console.log({ draggedBoard });
    sortBoardsInsidePage(draggedBoard);
  };

  const sortBoardsInsidePage = async (draggedBoard: IDraggedBoard) => {
    if (draggedBoard.draggedBoardOrder < draggedBoard.droppedOnBoardOrder) {
      console.log('from LEFT');
      // drag from LEFT
      const updatedBoards = sortedBoards?.map((board) => {
        if (
          board.order < draggedBoard.draggedBoardOrder ||
          board.order > draggedBoard.droppedOnBoardOrder
        ) {
          return board;
        }
        if (board._id === draggedBoard.draggedBoardId) {
          return { ...board, order: draggedBoard.droppedOnBoardOrder };
        }
        return { ...board, order: board.order - 1 };
      });

      if (updatedBoards) {
        for (let board of updatedBoards) {
          await updateBoard(board);
        }
      }
    }

    if (draggedBoard.draggedBoardOrder > draggedBoard.droppedOnBoardOrder) {
      console.log('from RIGHT');
      // drag from RIGHT
      const updatedBoards = sortedBoards?.map((board) => {
        if (
          board.order < draggedBoard.droppedOnBoardOrder ||
          board.order > draggedBoard.draggedBoardOrder
        ) {
          return board;
        }
        if (board._id === draggedBoard.draggedBoardId) {
          return { ...board, order: draggedBoard.droppedOnBoardOrder };
        }
        return { ...board, order: board.order + 1 };
      });
      if (updatedBoards) {
        for (let board of updatedBoards) {
          await updateBoard(board);
        }
      }
    }
  };

  return (
    <section className='flex gap-4'>
      {(boardsIsLoading || todosIsLoading) && (
        <Spinner text='Loading todos and boards ...' />
      )}
      <div className='flex gap-4 justify-center'>
        {sortedBoards &&
          sortedBoards.map((board) => (
            <Board
              key={board._id}
              title={board.title}
              order={board.order}
              _id={board._id || ''}
              todos={todos}
              onBoardDrop={handleOnBoardDrop}
            />
          ))}
        <NewBoard order={sortedBoards?.length || 0} />
      </div>
    </section>
  );
}
