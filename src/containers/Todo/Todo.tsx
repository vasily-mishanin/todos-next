'use client';
import './styles.css';
import { useEffect, useState } from 'react';
import {
  ArrowPathIcon,
  ArchiveBoxIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal, setOpenModal } from '@/store/modalSlice';
import { ITodo } from '@/store/types';
import { useUpdateTodoMutation } from '@/store/services/todosApi';

type TodoProps = {
  todo: ITodo;
  onUpdate: () => void;
  onDelete: () => void;
};

export default function Todo({ todo, onUpdate, onDelete }: TodoProps) {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [validationError, setValidationError] = useState({
    error: false,
    message: '',
  });
  const auth = useAppSelector((state) => state.auth.user);
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const [updateTodo, result] = useUpdateTodoMutation();
  const { isLoading, isError, error, data } = result;
  if (isError) {
    toast.error('Updating todo failed');
  }

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

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('handleUpdateTodo');
    await updateTodo({ ...currentTodo, userId: auth.id, _id: todo._id });

    // try {
    //   await axios.put('/api/todos', {
    //     ...currentTodo,
    //     userId: auth.id,
    //     id_: todo._id,
    //   });
    //   toast.success('Todo updated');
    //   onUpdate();
    // } catch (error: any) {
    //   console.log('Update Todo Failed', error.message);
    // }
  };

  const doneTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('handleDoneTodo');
    setCurrentTodo((prev) => ({ ...prev, done: !prev.done }));

    await updateTodo({
      ...currentTodo,
      done: !currentTodo.done,
      userId: auth.id,
      _id: todo._id,
    });

    // try {
    //   await axios.put('/api/todos', {
    //     ...currentTodo,
    //     done: !currentTodo.done,
    //     userId: auth.id,
    //     id_: todo._id,
    //   });
    //   toast.success('Todo updated');
    //   onUpdate();
    // } catch (error: any) {
    //   console.log('Update Todo Failed', error.message);
    // }
  };

  const deleteTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setOpenModal({
        id: 'delete-todo-modal',
        isOpen: true,
        data: { _id: todo._id },
      })
    );

    // try {
    //   if (todo._id) {
    //     await axios.delete('/api/todos', { data: { _id: todo._id } });
    //     toast.success('Todo deleted');
    //     onDelete();
    //   }
    // } catch (error: any) {
    //   console.log('Delete Todo Failed', error.message);
    // }
  };

  // useEffect(() => {
  //   updateTodo({
  //     ...currentTodo,
  //     done: currentTodo.done,
  //     userId: auth.id,
  //     _id: todo._id,
  //   });
  // }, [currentTodo.done]);

  const isActionAuthorized = auth.isAdmin || auth.id === todo.userId;

  const doneTodoStyle = `done-btn flex justify-center items-center rounded ${
    currentTodo.done ? 'done' : ''
  } ${!isActionAuthorized ? 'dimmed' : ''}`;

  return (
    <article className='relative todo-wrapper '>
      <form
        className=' flex flex-col gap-2 w-full h-full'
        onSubmit={handleUpdateTodo}
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

        <button
          type='button'
          className={doneTodoStyle}
          style={{ width: '1.5rem', height: '1.5rem' }}
          onClick={doneTodo}
          disabled={!isActionAuthorized}
        >
          <CheckCircleIcon style={{ width: '1rem' }} />
        </button>

        {(auth.isAdmin || auth.id === todo.userId) && (
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
