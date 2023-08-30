import { IBoard, ITodo } from '@/store/types';
import './Board.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { useUpdateBoardMutation } from '@/store/services/boardsApi';
import Spinner from '../Spinner/Spinner';

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

  return (
    <section className='board__wrapper'>
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
        {todos && todos.map((todo) => <Todo key={todo._id} todo={todo} />)}
        <NewTodo boardId={_id} />
      </div>
    </section>
  );
}
