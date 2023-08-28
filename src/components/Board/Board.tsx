import { IBoard } from '@/store/types';
import './Board.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

type BoardProps = {
  board: IBoard;
};

type Inputs = {
  title: string;
};

export default function Board({ board: { title } }: BoardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { title: title },
    mode: 'onChange',
  });

  const updateBoard: SubmitHandler<Inputs> = (formData) => {
    console.log({ formData });
  };

  return (
    <section className='board__wrapper'>
      <form
        className='flex items-center justify-between gap-2'
        onSubmit={handleSubmit(updateBoard)}
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
    </section>
  );
}
