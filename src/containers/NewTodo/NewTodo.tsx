'use client';
import './styles.css';
import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '@/store/hooks';
import { ITodo } from '@/store/types';
import { useAddTodoMutation } from '@/store/services/todosApi';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/Button/Button';

const initialTodo: ITodo = {
  title: '',
  details: '',
  userId: '',
  done: false,
  by: '',
};

export default function NewTodo() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>(initialTodo);
  const auth = useAppSelector((state) => state.auth.user);
  const [validationError, setValidationError] = useState({
    error: false,
    message: '',
  });

  const [addTodo, result] = useAddTodoMutation();
  const { isLoading, isError, error, data } = result;

  if (isError) {
    toast.error('Adding todo failed');
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('handleChange');
    const enteredValue = e.target.value;
    const name = e.target.name;

    if (name === 'title' && !enteredValue) {
      setValidationError({ error: true, message: 'Title required' });
    } else {
      setValidationError({ error: false, message: '' });
    }

    setCurrentTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = addTodo({ ...currentTodo, userId: auth.id, by: auth.username });
    setCurrentTodo(initialTodo);
  };

  return (
    <article className='relative new-todo-wrapper'>
      <form
        className=' flex flex-col gap-2 w-full h-full'
        onSubmit={handleSubmit}
      >
        <div className='relative flex flex-col bg-green-400 text-xl'>
          <label htmlFor='title'></label>
          <input
            className='new-todo__text-input'
            type='text'
            name='title'
            id='title'
            placeholder='New todo Title'
            value={currentTodo.title}
            onChange={handleChange}
            onBlur={() => setValidationError({ error: false, message: '' })}
          />
          {validationError.error && (
            <span className='new-todo__validation-error'>
              {validationError.message}
            </span>
          )}
        </div>

        <div className='flex flex-col bg-green-400 text-gray-600'>
          <label htmlFor='details'></label>
          <textarea
            className='new-todo__text-area w-full h-full overflow-scroll resize-none'
            rows={3}
            name='details'
            id='details'
            placeholder='Details'
            value={currentTodo.details}
            onChange={handleChange}
          />
        </div>

        <Button
          type='submit'
          btnType='submit'
          disabled={!currentTodo.title || validationError.error}
          isActive={!validationError.error}
        >
          <ArrowUpTrayIcon />
        </Button>
      </form>
    </article>
  );
}
