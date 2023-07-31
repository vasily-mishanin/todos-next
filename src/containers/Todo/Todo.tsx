'use client';
import './styles.css';
import { useEffect, useState, useRef } from 'react';
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
import { ITodo, ModalTypes } from '@/store/types';
import { useUpdateTodoMutation } from '@/store/services/todosApi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TodoProps, TodoStatus, ValidationError } from './types';

export default function Todo({ todo }: TodoProps) {
  const [currentTodo, setCurrentTodo] = useState<ITodo>(todo);
  const [status, setStatus] = useState<TodoStatus>('IDLE');

  const [updateTodo, result] = useUpdateTodoMutation();
  const { isLoading, isError, error, data } = result;

  const wrapperRef = useRef<HTMLElement>(null);

  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const {
    loading,
    error: authError,
    user,
  } = useAppSelector((state) => state.auth);

  if (isError) {
    toast.error('Updating todo failed');
  }

  const [validationError, setValidationError] = useState<ValidationError>({
    error: false,
    message: '',
  });

  useEffect(() => {
    if (!modalState.isOpen && modalState.id === ModalTypes.NONE) {
      setStatus('IDLE');
      setCurrentTodo(todo); // cancel changes
    }
  }, [modalState, todo]);

  useEffect(() => {
    if (isTodoChanged(todo, currentTodo)) {
      setStatus('IN_EDIT');
    } else {
      setStatus('IDLE');
    }
  }, [currentTodo]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        handleTodoOutsideClick();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const validateTodo = (name: string, enteredValue: string) => {
    if (name === 'title' && !enteredValue) {
      setValidationError({ error: true, message: 'Title required' });
    } else {
      setValidationError({ error: false, message: '' });
    }
  };

  const isTodoChanged = (prevTodo: ITodo, currentTodo: ITodo) => {
    return Object.keys(prevTodo).some((key) => {
      const prev = prevTodo[key as keyof ITodo];
      const current = currentTodo[key as keyof ITodo];
      if (typeof prev === 'string' && typeof current === 'string') {
        return prev.trim() != current.trim();
      }
      return prev != current;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const enteredValue = e.target.value;
    const name = e.target.name;
    validateTodo(name, enteredValue);

    setCurrentTodo((prev) => ({
      ...prev,
      [name]: enteredValue,
    }));
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTodo({ ...currentTodo, userId: user.id, _id: todo._id });
  };

  const doneTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentTodo((prev) => ({ ...prev, done: !prev.done }));

    await updateTodo({
      ...currentTodo,
      done: !currentTodo.done,
      userId: user.id,
      _id: todo._id,
    });
  };

  const deleteTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('IN_DELETE');
    dispatch(
      setOpenModal({
        id: ModalTypes.DELETE_TODO,
        isOpen: true,
        data: { _id: todo._id },
      })
    );
  };

  function handleTodoOutsideClick() {
    if (status === 'IN_EDIT') {
      setStatus('IN_UPDATE');
      dispatch(
        setOpenModal({
          id: ModalTypes.UPDATE_TODO,
          isOpen: true,
          data: { ...currentTodo, userId: user.id, _id: todo._id },
        })
      );
    }
  }

  const isActionAuthorized = user.isAdmin || user.id === todo.userId;

  const doneTodoStyle = `btn done-btn ${currentTodo.done ? 'done' : ''} ${
    !isActionAuthorized ? 'dimmed' : ''
  }`;

  const updateTodoStyle = `btn submit-btn ${
    status === 'IN_EDIT' ? 'active' : ''
  }`;

  const todoCardStyle = `todo-wrapper ${
    status === 'IN_DELETE'
      ? 'to-be-deleted'
      : status === 'IN_UPDATE'
      ? 'to-be-updated'
      : ''
  }`;

  return (
    <article className={todoCardStyle} ref={wrapperRef}>
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
          onClick={doneTodo}
          disabled={!isActionAuthorized}
        >
          <CheckCircleIcon />
        </button>

        {(user.isAdmin || user.id === todo.userId) && (
          <>
            <button
              type='submit'
              className={updateTodoStyle}
              disabled={validationError.error}
            >
              <ArrowPathIcon />
            </button>

            <button
              type='button'
              className='btn delete-btn'
              onClick={deleteTodo}
            >
              <ArchiveBoxIcon />
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
