'use client';
import './styles.css';
import { useContext, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { AuthContext } from '@/store/AuthProvider';
import { toast } from 'react-hot-toast';

export interface ITodo {
  title: string;
  details: string;
  userId: string;
  _id?: string;
}

type TodoProps = {
  todo: ITodo;
  onUpdate: () => {};
};

export default function Todo({ todo }: TodoProps) {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const auth = useContext(AuthContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put('/api/todos', {
      ...currentTodo,
      userId: auth.user.id,
      id_: todo._id,
    });
    toast.success('Todo updated');
    try {
    } catch (error: any) {
      console.log('Update Todo Failed', error.message);
    }
  };

  return (
    <article className='relative todo-wrapper'>
      <form
        className=' flex flex-col gap-2 w-full h-full'
        onSubmit={updateTodo}
      >
        <div className='flex flex-col bg-green-400 p-8 text-xl'>
          <label htmlFor='title'></label>
          <input
            type='text'
            name='title'
            id='title'
            value={currentTodo.title}
            onChange={handleChange}
          />
        </div>
        <hr />

        <div className='flex flex-col bg-green-400 p-8 text-gray-600'>
          <label htmlFor='details'></label>
          <textarea
            rows={4}
            className='w-full h-full overflow-scroll resize-none'
            name='details'
            id='details'
            value={currentTodo.details}
            onChange={handleChange}
          />
        </div>

        <button
          type='submit'
          className='submit-btn border px-2 py-2 flex justify-center items-center rounded'
          style={{ width: '2rem', height: '2rem' }}
        >
          <ArrowPathIcon
            className='text-blue-500'
            style={{ width: '1.5rem' }}
          />
        </button>
      </form>
    </article>
  );
}
