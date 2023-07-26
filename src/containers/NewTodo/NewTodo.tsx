'use client';
import './styles.css';
import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';

export interface ITodo {
  title: string;
  details: string;
  userId: string;
  _id?: string;
  done: boolean;
  by: string;
}

const initialTodo: ITodo = {
  title: '',
  details: '',
  userId: '',
  done: false,
  by: '',
};

type NewTodoProps = {
  onAddNeWTodo: () => void;
};

export default function NewTodo({ onAddNeWTodo }: NewTodoProps) {
  const [currentTodo, setCurrentTodo] = useState<ITodo>(initialTodo);
  const auth = useAppSelector((state) => state.auth.authState);
  const [validationError, setValidationError] = useState({
    error: false,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    try {
      await axios.post('/api/todos', {
        ...currentTodo,
        userId: auth.id,
        by: auth.username,
      });
      onAddNeWTodo();
      setCurrentTodo(initialTodo);
    } catch (error: any) {
      console.log('New Todo Failed', error.message);
    }
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
            className='text-input'
            type='text'
            name='title'
            id='title'
            placeholder='New todo Title'
            value={currentTodo.title}
            onChange={handleChange}
            onBlur={() => setValidationError({ error: false, message: '' })}
          />
          {validationError.error && (
            <span className='todo-validation-error'>
              {validationError.message}
            </span>
          )}
        </div>

        <hr />

        <div className='flex flex-col bg-green-400 text-gray-600'>
          <label htmlFor='details'></label>
          <textarea
            className='text-input w-full h-full overflow-scroll resize-none'
            rows={3}
            name='details'
            id='details'
            placeholder='Details'
            value={currentTodo.details}
            onChange={handleChange}
          />
        </div>

        <button
          type='submit'
          className='submit-btn px-2 py-2 flex justify-center items-center rounded'
          style={{ width: '1.5rem', height: '1.5rem' }}
          disabled={validationError.error}
        >
          <ArrowUpTrayIcon
            className='text-blue-500'
            style={{ width: '1.25rem' }}
          />
        </button>
      </form>
    </article>
  );
}
