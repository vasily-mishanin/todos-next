'use client';
import './styles.css';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowPathIcon,
  ArchiveBoxIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOpenModal } from '@/store/modalSlice';
import { ITodo, ModalTypes } from '@/store/types';
import { useUpdateTodoMutation } from '@/store/services/todosApi';
import { TodoProps, TodoStatus, ValidationError } from './types';
import { Button } from '@/components/Button/Button';

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
        className='flex flex-col gap-2 w-full h-full'
        onSubmit={handleUpdateTodo}
      >
        <div className='relative flex flex-col bg-green-400'>
          <label htmlFor='title'></label>
          <input
            className='todo__text-input'
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

        <div className='flex flex-col bg-green-400 text-gray-600 text-xs'>
          <label htmlFor='details'></label>
          <textarea
            className='todo__text-area w-full h-full overflow-scroll resize-none'
            rows={3}
            name='details'
            id='details'
            value={currentTodo.details}
            onChange={handleChange}
          />
        </div>

        <Button
          type='button'
          btnType='done'
          disabled={!isActionAuthorized}
          isActive={todo.done}
          clickHandler={doneTodo}
        >
          <CheckCircleIcon />
        </Button>

        {(user.isAdmin || user.id === todo.userId) && (
          <>
            <Button
              type='submit'
              btnType='submit'
              disabled={validationError.error || status !== 'IN_EDIT'}
              isActive={status === 'IN_EDIT'}
            >
              <ArrowPathIcon />
            </Button>

            <Button type='button' btnType='delete' clickHandler={deleteTodo}>
              <ArchiveBoxIcon />
            </Button>
          </>
        )}
      </form>
      <p className='by'>
        <UserIcon className='user-icon' />
        {todo.by}
      </p>
    </article>
  );
}
