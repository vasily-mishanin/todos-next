'use client';
import './styles.css';
import { useContext, useState } from 'react';
import {
  ArrowPathIcon,
  ArchiveBoxIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';
import { AuthContext } from '@/store/AuthProvider';
import { toast } from 'react-hot-toast';
import { ITodo } from '../NewTodo/NewTodo';

type TodoProps = {
  todo: ITodo;
  onUpdate: () => {};
  onDelete: () => {};
};

export default function Todo({ todo, onUpdate, onDelete }: TodoProps) {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [validationError, setValidationError] = useState({
    error: false,
    message: '',
  });
  const auth = useContext(AuthContext);

  console.log('TODO', auth, todo);

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
      [name]: enteredValue,
    }));
  };

  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put('/api/todos', {
        ...currentTodo,
        userId: auth.user.id,
        id_: todo._id,
      });
      toast.success('Todo updated');
      onUpdate();
    } catch (error: any) {
      console.log('Update Todo Failed', error.message);
    }
  };

  const deleteTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (todo._id) {
        await axios.delete('/api/todos', { data: { _id: todo._id } });
        toast.success('Todo deleted');
        onDelete();
      }
    } catch (error: any) {
      console.log('Delete Todo Failed', error.message);
    }
  };

  return (
    <article className='relative todo-wrapper'>
      <form
        className=' flex flex-col gap-2 w-full h-full'
        onSubmit={updateTodo}
      >
        <div className='relative flex flex-col bg-green-400 text-xl'>
          <label htmlFor='title'></label>
          <input
            className='text-input'
            type='text'
            name='title'
            id='title'
            value={currentTodo.title}
            onChange={handleChange}
          />
          {validationError.error && (
            <span className='todo-validation-error'>
              {validationError.message}
            </span>
          )}
        </div>

        <hr />

        <div className='flex flex-col bg-green-400 text-gray-600 text-sm'>
          <label htmlFor='details'></label>
          <textarea
            className='text-input w-full h-full overflow-scroll resize-none'
            rows={3}
            name='details'
            id='details'
            value={currentTodo.details}
            onChange={handleChange}
          />
        </div>

        {(auth.user.isAdmin || auth.user.id === todo.userId) && (
          <>
            <button
              type='submit'
              className='submit-btn flex justify-center items-center rounded'
              style={{ width: '1.5rem', height: '1.5rem' }}
              disabled={validationError.error}
            >
              <ArrowPathIcon
                className='text-blue-500'
                style={{ width: '1rem' }}
              />
            </button>
            <button
              type='button'
              className='delete-btn flex justify-center items-center rounded'
              style={{ width: '1.5rem', height: '1.5rem' }}
              onClick={deleteTodo}
            >
              <ArchiveBoxIcon style={{ width: '1rem' }} />
            </button>
          </>
        )}
      </form>
      <p className='by'>
        <UserIcon style={{ width: '0.75rem' }} />
        {todo.by}
      </p>
    </article>
  );
}
