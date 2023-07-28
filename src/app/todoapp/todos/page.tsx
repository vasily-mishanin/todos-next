'use client';

import Spinner from '@/components/Spinner/Spinner';
import NewTodo from '@/containers/NewTodo/NewTodo';
import Todo from '@/containers/Todo/Todo';
import { ITodo } from '@/store/types';
import { useGetTodosQuery } from '@/store/services/todosApi';
import { toast } from 'react-hot-toast';

export default function Todos() {
  const { isLoading, isFetching, data, error } = useGetTodosQuery(null);
  const todos = data?.data;

  if (error) {
    toast.error(`'Todos fetch failed: ' ${error}`);
  }

  const fetchTodos = async () => {};

  return (
    <section className='flex flex-col gap-4 py-4 px-10'>
      {isLoading || (isFetching && <Spinner text='Loading todos ...' />)}
      <div className='flex flex-wrap gap-4 max-[600px]:justify-center'>
        {todos &&
          todos.map((todo: ITodo) => (
            <Todo
              key={todo._id}
              todo={todo}
              onUpdate={fetchTodos}
              onDelete={fetchTodos}
            />
          ))}
        <NewTodo onAddNeWTodo={fetchTodos} />
      </div>
    </section>
  );
}
