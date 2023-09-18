'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import './NewBoard.css';
import { useAddBoardMutation } from '@/store/services/boardsApi';
import toast from 'react-hot-toast';

type NewBoardProps = {
  order: number;
};

type Inputs = {
  title: string;
};

export function NewBoard({ order }: NewBoardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: { title: '' },
    mode: 'onChange',
  });

  const [addBoard, result] = useAddBoardMutation();
  const { isLoading, isError, error, data } = result;

  if (data?.success === false) {
    toast.error(data.message);
  }

  const onAddNewBoard: SubmitHandler<Inputs> = async (formData) => {
    console.log(formData);
    await addBoard({ ...formData, order });
    reset();
  };

  return (
    <div className='new-board__wrapper'>
      <form
        className='flex items-center justify-between gap-2'
        onSubmit={handleSubmit(onAddNewBoard)}
      >
        <div className='new-board__title'>
          <span className='text-xs text-red-300 h-4'>
            {errors.title?.message}
          </span>
          <input
            className='new-board__title_input'
            {...register('title', {
              required: 'Required',
              minLength: { value: 3, message: 'Min. length is 3 characters' },
            })}
            type='text'
            placeholder='New board title'
          />
        </div>
        <button
          className='new-board__add-btn '
          type='submit'
          disabled={!!errors.title}
        >
          <PlusCircleIcon />
        </button>
      </form>
    </div>
  );
}
